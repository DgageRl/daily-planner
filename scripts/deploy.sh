#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

MODE="${1:-}"
LOCK_FILE="/tmp/daily-planner-deploy.lock"

API_UPSTREAM="infra/nginx/upstream/active.conf"
WEB_UPSTREAM="infra/nginx/web-upstream/active.conf"

API_URL="http://localhost:3000/health"
WEB_URL="http://localhost:8081/"

log() {
  printf '[%s] %s\n' "$(date '+%H:%M:%S')" "$*"
}

die() {
  log "ERROR: $*"
  exit 1
}

usage() {
  echo "Usage: $0 {status|api|web|all}"
  exit 2
}

require_file() {
  [[ -f "$1" ]] || die "Required file not found: $1"
}

active_slot() {
  local file="$1"
  local prefix="$2"
  local line

  line="$(grep -E '^[[:space:]]*server[[:space:]]+' "$file" |
    head -n 1 || true)"

  if [[ "$line" =~ server[[:space:]]+${prefix}-blue: ]]; then
    echo blue
  elif [[ "$line" =~ server[[:space:]]+${prefix}-green: ]]; then
    echo green
  else
    die "Cannot determine active slot from $file: $line"
  fi
}

wait_http() {
  local url="$1"
  local attempts="${2:-15}"
  local i

  for ((i=1; i<=attempts; i++)); do
    if curl --silent --fail --max-time 3 "$url" >/dev/null 2>&1; then
      return 0
    fi
    sleep 2
  done

  return 1
}

reload_proxy() {
  local proxy="$1"

  docker compose exec -T "$proxy" nginx -t &&
    docker compose exec -T "$proxy" nginx -s reload
}

restore_upstream() {
  local file="$1"
  local previous="$2"
  local proxy="$3"

  printf '%s\n' "$previous" > "$file"

  if reload_proxy "$proxy"; then
    log "Previous upstream restored and Nginx reloaded."
    return 0
  fi

  log "CRITICAL: Could not verify/reload restored Nginx config."
  log "Restored upstream file remains at: $file"
  return 1
}

status() {
  local api_slot web_slot api_code web_code

  require_file "$API_UPSTREAM"
  require_file "$WEB_UPSTREAM"

  api_slot="$(active_slot "$API_UPSTREAM" api)"
  web_slot="$(active_slot "$WEB_UPSTREAM" web)"

  echo "=== Active slots ==="
  echo "API: $api_slot"
  echo "Web: $web_slot"

  echo
  echo "=== Public endpoints ==="
  api_code="$(curl -sS -o /dev/null -w '%{http_code}' \
    --max-time 5 "$API_URL" || true)"
  web_code="$(curl -sS -o /dev/null -w '%{http_code}' \
    --max-time 5 "$WEB_URL" || true)"

  echo "API: HTTP ${api_code:-unavailable}"
  echo "Web: HTTP ${web_code:-unavailable}"

  echo
  echo "=== Containers ==="
  docker compose ps

  [[ "$api_code" == "200" && "$web_code" == "200" ]] ||
    return 1
}

deploy_one() {
  local kind="$1"
  local upstream_file prefix proxy test_url
  local active target service candidate_url previous backup
  local candidate_ok=false

  case "$kind" in
    api)
      upstream_file="$API_UPSTREAM"
      prefix="api"
      proxy="nginx"
      test_url="$API_URL"
      ;;
    web)
      upstream_file="$WEB_UPSTREAM"
      prefix="web"
      proxy="web"
      test_url="$WEB_URL"
      ;;
    *)
      die "Unknown deployment component: $kind"
      ;;
  esac

  require_file "$upstream_file"

  active="$(active_slot "$upstream_file" "$prefix")"
  if [[ "$active" == "blue" ]]; then
    target="green"
  else
    target="blue"
  fi

  service="${prefix}-${target}"
  backup="$(mktemp)"
  cp "$upstream_file" "$backup"
  previous="$(cat "$backup")"

  log "Deploying $kind: active=$active, target=$target"

  if ! docker compose up -d --build "$service"; then
    log "Build/start failed. Active upstream was not changed."
    rm -f "$backup"
    return 1
  fi

  log "Waiting for candidate $service"

  if [[ "$kind" == "api" ]]; then
    candidate_url="http://${service}:3000/health"
    for _ in $(seq 1 30); do
      if docker compose exec -T "$proxy" \
        wget -qO- "$candidate_url" >/dev/null 2>&1; then
        candidate_ok=true
        break
      fi
      sleep 2
    done
  else
    for _ in $(seq 1 30); do
      if docker compose exec -T "$service" \
        wget -qO- http://127.0.0.1/ >/dev/null 2>&1; then
        candidate_ok=true
        break
      fi
      sleep 2
    done
  fi

  if [[ "$candidate_ok" != true ]]; then
    log "Candidate health check failed. Active upstream remains unchanged."
    rm -f "$backup"
    return 1
  fi

  if [[ "$kind" == "api" ]]; then
    printf 'server %s:3000;\n' "$service" > "$upstream_file"
  else
    printf 'server %s:80;\n' "$service" > "$upstream_file"
  fi

  if ! docker compose exec -T "$proxy" nginx -t; then
    log "Nginx config test failed. Restoring previous upstream."
    restore_upstream "$upstream_file" "$previous" "$proxy" || true
    rm -f "$backup"
    return 1
  fi

  if ! docker compose exec -T "$proxy" nginx -s reload; then
    log "Nginx reload failed. Restoring previous upstream."
    restore_upstream "$upstream_file" "$previous" "$proxy" || true
    rm -f "$backup"
    return 1
  fi

  log "Checking public endpoint: $test_url"

  if ! wait_http "$test_url" 15; then
    log "Public check failed. Rolling back to $active."

    if restore_upstream "$upstream_file" "$previous" "$proxy" &&
       wait_http "$test_url" 10; then
      log "Rollback verified: $active is active."
    else
      log "CRITICAL: Rollback verification failed; inspect Nginx and upstream."
    fi

    rm -f "$backup"
    return 1
  fi

  rm -f "$backup"
  log "Deployment successful: $kind is now on $target."
}

[[ "$MODE" == "status" || "$MODE" == "api" ||
   "$MODE" == "web" || "$MODE" == "all" ]] || usage

if [[ "$MODE" == "status" ]]; then
  status
  exit $?
fi

exec 9>"$LOCK_FILE"
flock -n 9 || die "Another deployment is running."

case "$MODE" in
  api)
    deploy_one api
    ;;
  web)
    deploy_one web
    ;;
  all)
    deploy_one api
    deploy_one web
    ;;
esac

log "Deployment command finished."
