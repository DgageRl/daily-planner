import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from 'expo-router';

const API_URL = 'http://localhost:3000';

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueAt: string | null;
  startAt: string | null;
  endAt: string | null;
};

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
type CalendarView = 'month' | 'week' | 'day';

const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель',
  'Май', 'Июнь', 'Июль', 'Август',
  'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function taskDateKey(value: string | null) {
  if (!value) return null;

  // Для дат без времени сохраняем исходную календарную дату.
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : dateKey(date);
}

function sameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth();
}

const TIMELINE_START = 8;
const TIMELINE_END = 23;
const HOUR_HEIGHT = 54;

function scheduledDateKey(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : dateKey(date);
}

function scheduledMinutes(value: string) {
  const date = new Date(value);
  return date.getHours() * 60 + date.getMinutes();
}


export default function CalendarScreen() {
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDay, setSelectedDay] = useState(() => dateKey(new Date()));
  const [viewMode, setViewMode] = useState<CalendarView>('month');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTasks = useCallback(async () => {
    try {
      setError('');
      const response = await fetch(`${API_URL}/tasks`);

      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Сервер вернул неожиданный формат задач');
      }

      setTasks(data);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'Не удалось загрузить задачи'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks])
  );

  const calendarDays = useMemo(() => {
    const firstDay = new Date(
      month.getFullYear(),
      month.getMonth(),
      1
    );

    // Понедельник — первый день недели.
    const offset = (firstDay.getDay() + 6) % 7;
    const gridStart = new Date(
      month.getFullYear(),
      month.getMonth(),
      1 - offset
    );

    return Array.from({ length: 42 }, (_, index) => {
      const day = new Date(gridStart);
      day.setDate(gridStart.getDate() + index);
      return day;
    });
  }, [month]);

  const visibleCalendarDays = useMemo(() => {
    if (viewMode === 'month') return calendarDays;

    const selected = new Date(`${selectedDay}T12:00:00`);

    if (viewMode === 'day') {
      return [new Date(
        selected.getFullYear(),
        selected.getMonth(),
        selected.getDate()
      )];
    }

    const offset = (selected.getDay() + 6) % 7;
    const weekStart = new Date(
      selected.getFullYear(),
      selected.getMonth(),
      selected.getDate() - offset
    );
    const weekEnd = new Date(
      weekStart.getFullYear(),
      weekStart.getMonth(),
      weekStart.getDate() + 6
    );

    return calendarDays.filter((day) => day >= weekStart && day <= weekEnd);
  }, [calendarDays, selectedDay, viewMode]);

  const tasksByDate = useMemo(() => {
    const grouped: Record<string, Task[]> = {};

    tasks.forEach((task) => {
      const key = taskDateKey(task.dueAt);
      if (!key) return;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(task);
    });

    return grouped;
  }, [tasks]);

  const selectedTasks = tasksByDate[selectedDay] ?? [];
  const todayKey = dateKey(new Date());

  function changePeriod(amount: number) {
    if (viewMode === 'month') {
      const next = new Date(
        month.getFullYear(),
        month.getMonth() + amount,
        1
      );
      setMonth(next);
      setSelectedDay(dateKey(next));
      return;
    }

    const next = new Date(`${selectedDay}T12:00:00`);
    next.setDate(next.getDate() + amount * (viewMode === 'week' ? 7 : 1));
    setSelectedDay(dateKey(next));
    setMonth(new Date(next.getFullYear(), next.getMonth(), 1));
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>ТВОЙ ПЛАН</Text>
          <Text style={styles.title}>Календарь</Text>
          <Text style={styles.subtitle}>
            Все важные дела в одном месте
          </Text>
        </View>
        <View style={styles.headerIcon}>
          <Text style={styles.headerEmoji}>📅</Text>
        </View>
      </View>

      <View style={styles.monthCard}>
        <View style={styles.viewSwitcher}>
          {([
            ['week', 'Неделя'],
            ['month', 'Месяц'],
          ] as const).map(([mode, label]) => (
            <Pressable
              key={mode}
              onPress={() => setViewMode(mode)}
              style={[
                styles.viewOption,
                viewMode === mode && styles.viewOptionActive,
              ]}
            >
              <Text
                style={[
                  styles.viewOptionText,
                  viewMode === mode && styles.viewOptionTextActive,
                ]}
              >
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.monthHeader}>
          <Pressable
            accessibilityLabel="Предыдущий период"
            onPress={() => changePeriod(-1)}
            style={styles.arrowButton}
          >
            <Text style={styles.arrow}>‹</Text>
          </Pressable>

          <View style={styles.monthTitleWrap}>
            <Text style={styles.monthTitle}>
              {viewMode === 'month'
                ? MONTHS[month.getMonth()]
                : viewMode === 'week'
                  ? 'Неделя'
                  : 'Выбранный день'}
            </Text>
            <Text style={styles.year}>
              {viewMode === 'month'
                ? month.getFullYear()
                : new Date(`${selectedDay}T12:00:00`).toLocaleDateString(
                    'ru-RU',
                    { day: 'numeric', month: 'long', year: 'numeric' }
                  )}
            </Text>
          </View>

          <Pressable
            accessibilityLabel="Следующий период"
            onPress={() => changePeriod(1)}
            style={styles.arrowButton}
          >
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => {
            const now = new Date();
            setMonth(new Date(now.getFullYear(), now.getMonth(), 1));
            setSelectedDay(dateKey(now));
          }}
          style={styles.todayButton}
        >
          <Text style={styles.todayButtonText}>Сегодня</Text>
        </Pressable>

        {viewMode === 'month' && (
          <View style={styles.weekRow}>
            {WEEKDAYS.map((day) => (
              <View key={day} style={styles.weekCell}>
                <Text style={styles.weekText}>{day}</Text>
              </View>
            ))}
          </View>
        )}

        {viewMode === 'week' ? (
          <View style={styles.timelineCard}>
            <View style={styles.timelineHeader}>
              <View style={styles.timelineGutter} />
              {visibleCalendarDays.map((day) => (
                <Pressable
                  key={dateKey(day)}
                  style={[
                    styles.timelineDayHeader,
                    dateKey(day) === selectedDay && styles.timelineDayHeaderSelected,
                  ]}
                  onPress={() => setSelectedDay(dateKey(day))}
                >
                  <Text style={styles.timelineDayName}>
                    {WEEKDAYS[(day.getDay() + 6) % 7]}
                  </Text>
                  <Text style={[
                    styles.timelineDayNumber,
                    dateKey(day) === todayKey && styles.timelineTodayNumber,
                    dateKey(day) === selectedDay && styles.timelineSelectedNumber,
                  ]}>
                    {day.getDate()}
                  </Text>
                </Pressable>
              ))}
            </View>
            <ScrollView
              style={styles.timelineScroll}
              nestedScrollEnabled
              showsVerticalScrollIndicator
            >
              <View style={styles.timelineBody}>
                <View style={styles.timelineHours}>
                  {Array.from(
                    { length: TIMELINE_END - TIMELINE_START },
                    (_, index) => TIMELINE_START + index
                  ).map((hour) => (
                    <View key={hour} style={styles.timelineHourCell}>
                      <Text style={styles.timelineHourText}>
                        {String(hour).padStart(2, '0')}:00
                      </Text>
                    </View>
                  ))}
                </View>
                {visibleCalendarDays.map((day) => {
                  const key = dateKey(day);
                  const dayTasks = tasks.filter((task) =>
                    scheduledDateKey(task.startAt) === key
                    && !!task.endAt
                    && new Date(task.endAt).getTime() > new Date(task.startAt!).getTime()
                  );
                  return (
                    <View key={key} style={styles.timelineDayColumn}>
                      {Array.from(
                        { length: TIMELINE_END - TIMELINE_START },
                        (_, index) => (
                          <View key={index} style={styles.timelineHourLine} />
                        )
                      )}
                      {dayTasks.map((task) => {
                        const startMinutes = scheduledMinutes(task.startAt!);
                        const endMinutes = scheduledMinutes(task.endAt!);
                        const top = (startMinutes - TIMELINE_START * 60) / 60 * HOUR_HEIGHT;
                        const bottom = (endMinutes - TIMELINE_START * 60) / 60 * HOUR_HEIGHT;
                        if (endMinutes <= TIMELINE_START * 60 || startMinutes >= TIMELINE_END * 60) return null;
                        const visibleTop = Math.max(0, top);
                        const visibleBottom = Math.min(
                          (TIMELINE_END - TIMELINE_START) * HOUR_HEIGHT,
                          bottom
                        );
                        const blockStyle = task.completed
                          ? styles.timelineBlockDone
                          : task.priority === 'high'
                            ? styles.timelineBlockHigh
                            : task.priority === 'low'
                              ? styles.timelineBlockLow
                              : styles.timelineBlockNormal;
                        const blockTextStyle = task.completed
                          ? styles.timelineBlockTextDone
                          : task.priority === 'high'
                            ? styles.timelineBlockTextHigh
                            : task.priority === 'low'
                              ? styles.timelineBlockTextLow
                              : styles.timelineBlockTextNormal;
                        return (
                          <Pressable
                            key={task.id}
                            style={[
                              styles.timelineTaskBlock,
                              blockStyle,
                              {
                                top: visibleTop,
                                height: Math.max(28, visibleBottom - visibleTop),
                              },
                            ]}
                            onPress={() => setSelectedDay(key)}
                          >
                            <Text numberOfLines={2} style={[styles.timelineBlockTitle, blockTextStyle]}>
                              {task.title}
                            </Text>
                            <Text style={[styles.timelineBlockTime, blockTextStyle]}>
                              {new Date(task.startAt!).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                              {'–'}
                              {new Date(task.endAt!).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <Text style={styles.timelineHint}>
              Показаны задачи с заданным временем начала и окончания, с 08:00 до 22:00.
            </Text>
          </View>
        ) : (
        <View style={styles.daysGrid}>
          {visibleCalendarDays.map((day) => {
            const key = dateKey(day);
            const inMonth = sameMonth(day, month);
            const isSelected = key === selectedDay;
            const isToday = key === todayKey;
            const dayTasks = tasksByDate[key] ?? [];

            return (
              <Pressable
                key={key}
                onPress={() => setSelectedDay(key)}
                style={[
                  styles.dayCell,
                  viewMode === 'month' && styles.monthDayCell,
                  viewMode === 'month' && isToday && styles.monthDayCellToday,
                  viewMode === 'month' && isToday && isSelected && styles.monthDayCellTodaySelected,
                  viewMode === 'day' && styles.singleDayCell,
                  viewMode !== 'month' && styles.weekDayCell,
                  viewMode !== 'month' && isSelected && styles.weekDayCellSelected,
                ]}
              >
                {viewMode !== 'month' && (
                  <Text
                    style={[
                      styles.weekDayName,
                      isSelected && styles.weekDayNameSelected,
                    ]}
                  >
                    {WEEKDAYS[(day.getDay() + 6) % 7]}
                  </Text>
                )}
                <View
                  style={[
                    styles.dayNumberWrap,
                    viewMode === 'month' && styles.monthDayNumberWrap,
                    isSelected && styles.selectedDay,
                    isToday && !isSelected && styles.todayDay,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayNumber,
                      !inMonth && styles.otherMonthText,
                      isSelected && styles.selectedDayText,
                      isToday && !isSelected && styles.todayText,
                    ]}
                  >
                    {day.getDate()}
                  </Text>
                </View>

                <View style={[styles.dayTaskPills, viewMode === 'month' && styles.monthDayTaskPills]}>
                  {dayTasks
                    .slice(0, viewMode === 'month' ? 3 : 3)
                    .map((task) => {
                      const pillStyle = task.completed
                        ? styles.dayTaskPillDone
                        : task.priority === 'high'
                          ? styles.dayTaskPillHigh
                          : task.priority === 'low'
                            ? styles.dayTaskPillLow
                            : styles.dayTaskPillNormal;

                      const textStyle = task.completed
                        ? styles.dayTaskTextDone
                        : task.priority === 'high'
                          ? styles.dayTaskTextHigh
                          : task.priority === 'low'
                            ? styles.dayTaskTextLow
                            : styles.dayTaskTextNormal;

                      return (
                        <Pressable
                          key={task.id}
                          onPress={() => setSelectedDay(key)}
                          style={[styles.dayTaskPill, viewMode === 'month' && styles.monthDayTaskPill, pillStyle]}
                        >
                          <Text
                            numberOfLines={1}
                            style={[styles.dayTaskText, viewMode === 'month' && styles.monthDayTaskText, textStyle]}
                          >
                            {task.title}
                          </Text>
                        </Pressable>
                      );
                    })}
                  {dayTasks.length > (viewMode === 'month' ? 3 : 3) && (
                    <Text style={styles.moreTasksText}>
                      +{dayTasks.length - (viewMode === 'month' ? 3 : 3)}
                    </Text>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
        )}

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#6B5CE7' }]} />
            <Text style={styles.legendText}>В процессе</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#42B883' }]} />
            <Text style={styles.legendText}>Выполнено</Text>
          </View>
        </View>
      </View>

      <View style={styles.agendaHeader}>
        <View>
          <Text style={styles.agendaTitle}>Планы на день</Text>
          <Text style={styles.agendaDate}>
            {new Date(`${selectedDay}T12:00:00`).toLocaleDateString(
              'ru-RU',
              { day: 'numeric', month: 'long', weekday: 'long' }
            )}
          </Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{selectedTasks.length}</Text>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator
          color="#6B5CE7"
          size="large"
          style={styles.loader}
        />
      ) : error ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>⚠️</Text>
          <Text style={styles.emptyTitle}>Не удалось загрузить задачи</Text>
          <Text style={styles.emptyText}>{error}</Text>
          <Pressable onPress={loadTasks} style={styles.retryButton}>
            <Text style={styles.retryText}>Повторить</Text>
          </Pressable>
        </View>
      ) : selectedTasks.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>🌿</Text>
          <Text style={styles.emptyTitle}>На этот день пока пусто</Text>
          <Text style={styles.emptyText}>
            Добавь задаче дату в разделе «Задачи», и она появится здесь.
          </Text>
        </View>
      ) : (
        <View style={styles.taskList}>
          {selectedTasks.map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <View
                style={[
                  styles.taskAccent,
                  task.completed && styles.taskAccentDone,
                  task.priority === 'high' && !task.completed
                    && styles.taskAccentHigh,
                ]}
              />
              <View style={styles.taskContent}>
                <Text
                  style={[
                    styles.taskTitle,
                    task.completed && styles.taskTitleDone,
                  ]}
                >
                  {task.title}
                </Text>
                {!!task.description && (
                  <Text style={styles.taskDescription} numberOfLines={2}>
                    {task.description}
                  </Text>
                )}
                <View style={styles.taskMeta}>
                  <Text
                    style={[
                      styles.priorityBadge,
                      task.priority === 'high' && styles.priorityBadgeHigh,
                      task.priority === 'low' && styles.priorityBadgeLow,
                      task.completed && styles.priorityBadgeDone,
                    ]}
                  >
                    {task.completed
                      ? 'Завершена'
                      : task.priority === 'high'
                        ? 'Высокий приоритет'
                        : task.priority === 'low'
                          ? 'Низкий приоритет'
                          : 'Обычный приоритет'}
                  </Text>
                  <Text
                    style={[
                      styles.statusBadge,
                      task.completed ? styles.statusBadgeDone : styles.statusBadgeActive,
                    ]}
                  >
                    {task.completed ? '✓ Выполнена' : '● В процессе'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      <View style={styles.footerNote}>
        <Text style={styles.footerIcon}>💡</Text>
        <Text style={styles.footerText}>
          Задачи появятся в календаре, когда у них будет указана дата.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F6F7FC' },
  content: { padding: 20, paddingTop: 58, paddingBottom: 36 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  eyebrow: {
    color: '#8A86B2',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.8,
    marginBottom: 6,
  },
  title: { color: '#24243A', fontSize: 30, fontWeight: '800' },
  subtitle: { color: '#9293A7', fontSize: 13, marginTop: 6 },
  headerIcon: {
    width: 54, height: 54, borderRadius: 18,
    backgroundColor: '#EAE7FF', alignItems: 'center',
    justifyContent: 'center',
  },
  headerEmoji: { fontSize: 27 },
  monthCard: {
    backgroundColor: '#FFFFFF', borderRadius: 24,
    padding: 16, borderWidth: 1, borderColor: '#ECECF5',
    marginBottom: 26,
  },
  viewSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#F3F2FA',
    borderRadius: 14,
    padding: 4,
    marginBottom: 18,
    gap: 4,
  },
  viewOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 11,
  },
  viewOptionActive: {
    backgroundColor: '#6B5CE7',
  },
  viewOptionText: {
    color: '#77778E',
    fontSize: 12,
    fontWeight: '700',
  },
  viewOptionTextActive: {
    color: '#FFFFFF',
  },
  monthHeader: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 12,
  },
  arrowButton: {
    width: 40, height: 40, borderRadius: 14,
    backgroundColor: '#F5F4FF', alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: { fontSize: 30, color: '#6B5CE7', lineHeight: 34 },
  monthTitleWrap: { alignItems: 'center' },
  monthTitle: { color: '#292842', fontSize: 19, fontWeight: '800' },
  year: { color: '#9293A7', fontSize: 12, marginTop: 2 },
  todayButton: {
    alignSelf: 'center', paddingHorizontal: 16, paddingVertical: 7,
    backgroundColor: '#F0EEFF', borderRadius: 12, marginBottom: 18,
  },
  todayButtonText: { color: '#6B5CE7', fontSize: 12, fontWeight: '800' },
  weekRow: { flexDirection: 'row', marginBottom: 8 },
  weekCell: { flex: 1, alignItems: 'center', paddingVertical: 6 },
  weekText: { color: '#9696AA', fontSize: 11, fontWeight: '700' },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  timelineCard: {
    borderWidth: 1, borderColor: '#ECECF5', borderRadius: 14,
    overflow: 'hidden', backgroundColor: '#FFFFFF',
  },
  timelineHeader: {
    flexDirection: 'row', backgroundColor: '#FAF9FF',
    borderBottomWidth: 1, borderBottomColor: '#ECECF5',
  },
  timelineGutter: { width: 42 },
  timelineDayHeader: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingVertical: 9, minWidth: 0,
  },
  timelineDayHeaderSelected: { backgroundColor: '#F0EEFF' },
  timelineDayName: { color: '#9293A7', fontSize: 10, fontWeight: '700' },
  timelineDayNumber: {
    marginTop: 5, color: '#38374F', fontSize: 12, fontWeight: '800',
  },
  timelineTodayNumber: {
    color: '#6B5CE7', textDecorationLine: 'underline',
  },
  timelineSelectedNumber: {
    color: '#FFFFFF', backgroundColor: '#6B5CE7',
    overflow: 'hidden', borderRadius: 9, paddingHorizontal: 6, paddingVertical: 3,
  },
  timelineScroll: { maxHeight: 570 },
  timelineBody: { flexDirection: 'row' },
  timelineHours: { width: 42 },
  timelineHourCell: {
    height: 54, paddingTop: 3, paddingRight: 4,
    alignItems: 'flex-end', borderBottomWidth: 1, borderBottomColor: '#F0F0F7',
  },
  timelineHourText: { color: '#9293A7', fontSize: 9 },
  timelineDayColumn: {
    flex: 1, height: 756, minWidth: 0, position: 'relative',
    borderLeftWidth: 1, borderLeftColor: '#ECECF5',
  },
  timelineHourLine: {
    height: 54, borderBottomWidth: 1, borderBottomColor: '#F0F0F7',
  },
  timelineTaskBlock: {
    position: 'absolute', left: 1, right: 1, zIndex: 2,
    borderRadius: 5, paddingHorizontal: 3, paddingVertical: 3,
    overflow: 'hidden', borderLeftWidth: 2,
  },
  timelineBlockNormal: { backgroundColor: '#EAE7FF', borderLeftColor: '#6B5CE7' },
  timelineBlockHigh: { backgroundColor: '#FFE5E9', borderLeftColor: '#F06B7A' },
  timelineBlockLow: { backgroundColor: '#DDF5E8', borderLeftColor: '#42B883' },
  timelineBlockDone: { backgroundColor: '#DDF5E8', borderLeftColor: '#42B883' },
  timelineBlockTitle: { fontSize: 9, fontWeight: '800' },
  timelineBlockTextNormal: { color: '#5545B5' },
  timelineBlockTextHigh: { color: '#B83F59' },
  timelineBlockTextLow: { color: '#237B57' },
  timelineBlockTextDone: { color: '#237B57', textDecorationLine: 'line-through' },
  timelineBlockTime: { fontSize: 8, marginTop: 2 },
  timelineHint: {
    padding: 10, color: '#9293A7', fontSize: 10, lineHeight: 15,
  },
  monthDayCell: {
    height: 126,
    minHeight: 126,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingHorizontal: 3,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#E7E8F1',
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
  },
  monthDayCellToday: {
    backgroundColor: 'rgba(107, 92, 231, 0.14)',
    borderColor: 'rgba(107, 92, 231, 0.40)',
  },
  monthDayCellTodaySelected: {
    backgroundColor: 'rgba(107, 92, 231, 0.06)',
    borderColor: 'rgba(107, 92, 231, 0.25)',
  },
  monthDayNumberWrap: {
    width: 25,
    height: 25,
    borderRadius: 8,
    alignSelf: 'center',
  },
  monthDayTaskPills: {
    marginTop: 4,
    gap: 3,
  },
  monthDayTaskPill: {
    borderRadius: 3,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  monthDayTaskText: {
    fontSize: 8,
    lineHeight: 10,
  },
  dayCell: {
    width: '14.2857%', alignItems: 'center',
    paddingVertical: 3, minHeight: 49,
  },
  singleDayCell: {
    width: '100%',
    paddingVertical: 12,
    minHeight: 64,
  },
  weekDayCell: {
    borderRadius: 14,
    paddingTop: 8,
    paddingBottom: 5,
    minHeight: 68,
  },
  weekDayCellSelected: {
    backgroundColor: '#F0EEFF',
  },
  weekDayName: {
    color: '#9293A7',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  weekDayNameSelected: {
    color: '#6B5CE7',
  },
  dayNumberWrap: {
    width: 34, height: 34, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  dayNumber: { color: '#38374F', fontSize: 13, fontWeight: '600' },
  otherMonthText: { color: '#D0D0DC' },
  selectedDay: { backgroundColor: '#6B5CE7' },
  selectedDayText: { color: '#FFFFFF', fontWeight: '800' },
  todayDay: { backgroundColor: '#EFEDFF', borderWidth: 1, borderColor: '#6B5CE7' },
  todayText: { color: '#6B5CE7', fontWeight: '800' },
  dayTaskPills: {
    width: '100%',
    alignSelf: 'stretch',
    gap: 3,
    marginTop: 5,
  },
  dayTaskPill: {
    borderRadius: 4,
    paddingHorizontal: 3,
    paddingVertical: 3,
    minWidth: 0,
  },
  dayTaskPillNormal: { backgroundColor: '#EAE7FF' },
  dayTaskPillHigh: { backgroundColor: '#FFE5E9' },
  dayTaskPillLow: { backgroundColor: '#DDF5E8' },
  dayTaskPillDone: { backgroundColor: '#DDF5E8' },
  dayTaskText: {
    fontSize: 8,
    lineHeight: 10,
    fontWeight: '700',
  },
  dayTaskTextNormal: { color: '#5545B5' },
  dayTaskTextHigh: { color: '#B83F59' },
  dayTaskTextLow: { color: '#237B57' },
  dayTaskTextDone: {
    color: '#237B57',
    textDecorationLine: 'line-through',
  },
  moreTasksText: {
    color: '#77778E',
    fontSize: 9,
    fontWeight: '800',
    paddingLeft: 2,
  },
  legend: {
    flexDirection: 'row', justifyContent: 'center',
    gap: 20, marginTop: 16, paddingTop: 14,
    borderTopWidth: 1, borderTopColor: '#F0F0F7',
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 7, height: 7, borderRadius: 4 },
  legendText: { color: '#9293A7', fontSize: 11 },
  agendaHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 14,
  },
  agendaTitle: { color: '#292842', fontSize: 20, fontWeight: '800' },
  agendaDate: {
    color: '#9293A7', fontSize: 12, marginTop: 5,
    textTransform: 'capitalize',
  },
  countBadge: {
    minWidth: 34, height: 34, paddingHorizontal: 9,
    borderRadius: 12, backgroundColor: '#EAE7FF',
    alignItems: 'center', justifyContent: 'center',
  },
  countText: { color: '#6B5CE7', fontSize: 13, fontWeight: '800' },
  loader: { marginTop: 30 },
  emptyCard: {
    backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24,
    alignItems: 'center', borderWidth: 1, borderColor: '#ECECF5',
  },
  emptyEmoji: { fontSize: 30, marginBottom: 12 },
  emptyTitle: {
    color: '#34334D', fontSize: 15, fontWeight: '800',
    textAlign: 'center',
  },
  emptyText: {
    color: '#9293A7', fontSize: 12, lineHeight: 19,
    textAlign: 'center', marginTop: 8,
  },
  retryButton: {
    backgroundColor: '#6B5CE7', borderRadius: 12,
    paddingHorizontal: 18, paddingVertical: 10, marginTop: 16,
  },
  retryText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  taskList: { gap: 10 },
  taskCard: {
    flexDirection: 'row', backgroundColor: '#FFFFFF',
    borderRadius: 18, borderWidth: 1, borderColor: '#ECECF5',
    overflow: 'hidden', padding: 14, gap: 12,
  },
  taskAccent: {
    width: 4, borderRadius: 4, backgroundColor: '#6B5CE7',
  },
  taskAccentDone: { backgroundColor: '#42B883' },
  taskAccentHigh: { backgroundColor: '#F06B7A' },
  taskContent: { flex: 1 },
  taskTitle: { color: '#34334D', fontSize: 14, fontWeight: '800' },
  taskTitleDone: { color: '#9B9BAE', textDecorationLine: 'line-through' },
  taskDescription: { color: '#9293A7', fontSize: 12, lineHeight: 18, marginTop: 5 },
  taskMeta: {
    flexDirection: 'row', flexWrap: 'wrap',
    alignItems: 'center', gap: 10, marginTop: 10,
  },
  priorityBadge: {
    color: '#6B5CE7',
    backgroundColor: '#F0EEFF',
    fontSize: 10,
    fontWeight: '800',
    overflow: 'hidden',
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  priorityBadgeHigh: {
    color: '#D94D67',
    backgroundColor: '#FFF0F2',
  },
  priorityBadgeLow: {
    color: '#268A68',
    backgroundColor: '#EAF8F1',
  },
  priorityBadgeDone: {
    color: '#268A68',
    backgroundColor: '#EAF8F1',
  },
  statusBadge: {
    fontSize: 10,
    fontWeight: '800',
    overflow: 'hidden',
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  statusBadgeActive: {
    color: '#6B5CE7',
    backgroundColor: '#F0EEFF',
  },
  statusBadgeDone: {
    color: '#268A68',
    backgroundColor: '#EAF8F1',
  },
  footerNote: {
    flexDirection: 'row', gap: 10, alignItems: 'flex-start',
    backgroundColor: '#EFEDFF', borderRadius: 16,
    padding: 14, marginTop: 22,
  },
  footerIcon: { fontSize: 16 },
  footerText: { flex: 1, color: '#77719F', fontSize: 11, lineHeight: 17 },
});
