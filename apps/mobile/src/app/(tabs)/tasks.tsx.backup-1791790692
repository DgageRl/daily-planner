import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const API_URL = 'http://localhost:3000';

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueAt: string | null;
};

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTasks = useCallback(async () => {
    try {
      setError('');
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) throw new Error();
      setTasks(await response.json());
    } catch {
      setError('Не удалось загрузить задачи. Проверь API на порту 3000.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  async function addTask() {
    if (!title.trim()) {
      setError('Введите название задачи.');
      return;
    }

    try {
      setError('');
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          priority,
        }),
      });
      if (!response.ok) throw new Error();

      setTitle('');
      setDescription('');
      setPriority('medium');
      await loadTasks();
    } catch {
      setError('Не удалось сохранить задачу.');
    }
  }

  async function toggleTask(task: Task) {
    try {
      const response = await fetch(`${API_URL}/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (!response.ok) throw new Error();
      await loadTasks();
    } catch {
      setError('Не удалось изменить статус задачи.');
    }
  }

  async function deleteTask(id: string) {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error();
      await loadTasks();
    } catch {
      setError('Не удалось удалить задачу.');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.eyebrow}>МОЁ ПРОСТРАНСТВО</Text>
      <Text style={styles.heading}>Мои задачи</Text>
      <Text style={styles.subtitle}>
        Планируйте дела и отмечайте выполненное.
      </Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.form}>
        <Text style={styles.formTitle}>Новая задача</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Название задачи"
          placeholderTextColor="#85899A"
          style={styles.input}
        />
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Описание (необязательно)"
          placeholderTextColor="#85899A"
          style={[styles.input, styles.description]}
          multiline
        />

        <Text style={styles.label}>Приоритет</Text>
        <View style={styles.priorities}>
          {([
            ['low', 'Низкий'],
            ['medium', 'Средний'],
            ['high', 'Высокий'],
          ] as const).map(([value, label]) => (
            <Pressable
              key={value}
              onPress={() => setPriority(value)}
              style={[
                styles.priorityButton,
                priority === value && styles.prioritySelected,
              ]}
            >
              <Text
                style={[
                  styles.priorityText,
                  priority === value && styles.priorityTextSelected,
                ]}
              >
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>+ Добавить задачу</Text>
        </Pressable>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Все задачи</Text>
        <Text style={styles.counter}>{tasks.length}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#635BFF" />
      ) : tasks.length === 0 ? (
        <Text style={styles.empty}>Задач пока нет — добавьте первую выше.</Text>
      ) : (
        tasks.map((task) => (
          <View key={task.id} style={styles.taskCard}>
            <Pressable
              onPress={() => toggleTask(task)}
              style={styles.taskRow}
            >
              <View
                style={[
                  styles.checkbox,
                  task.completed && styles.checkboxDone,
                ]}
              >
                <Text style={styles.checkmark}>
                  {task.completed ? '✓' : ''}
                </Text>
              </View>
              <View style={styles.taskBody}>
                <Text
                  style={[
                    styles.taskTitle,
                    task.completed && styles.completedTitle,
                  ]}
                >
                  {task.title}
                </Text>
                {task.description ? (
                  <Text style={styles.taskDescription}>
                    {task.description}
                  </Text>
                ) : null}
                <Text style={styles.taskMeta}>
                  Приоритет: {task.priority === 'high'
                    ? 'Высокий'
                    : task.priority === 'low'
                      ? 'Низкий'
                      : 'Средний'}
                  {' · '}
                  {task.completed ? 'Выполнена' : 'В процессе'}
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => deleteTask(task.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteText}>Удалить</Text>
            </Pressable>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    maxWidth: 1000,
    alignSelf: 'center',
    padding: 32,
    gap: 16,
    backgroundColor: '#F7F8FC',
    minHeight: '100%',
  },
  eyebrow: { color: '#635BFF', fontSize: 11, fontWeight: '800', letterSpacing: 2 },
  heading: { color: '#20243A', fontSize: 34, fontWeight: '800' },
  subtitle: { color: '#777D90', fontSize: 15, marginBottom: 8 },
  error: { color: '#C0394B', padding: 12, backgroundColor: '#FDECEF', borderRadius: 10 },
  form: { padding: 22, backgroundColor: '#FFFFFF', borderRadius: 18, gap: 12, borderWidth: 1, borderColor: '#E8EAF3' },
  formTitle: { fontSize: 18, color: '#20243A', fontWeight: '700', marginBottom: 4 },
  input: { backgroundColor: '#F8F9FC', borderWidth: 1, borderColor: '#E4E7F0', borderRadius: 10, padding: 13, color: '#20243A', fontSize: 15 },
  description: { minHeight: 70, textAlignVertical: 'top' },
  label: { color: '#50566B', fontWeight: '600' },
  priorities: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  priorityButton: { borderWidth: 1, borderColor: '#E1E3EE', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 9 },
  prioritySelected: { backgroundColor: '#635BFF', borderColor: '#635BFF' },
  priorityText: { color: '#53596D', fontSize: 13 },
  priorityTextSelected: { color: '#FFFFFF', fontWeight: '700' },
  addButton: { alignSelf: 'flex-start', backgroundColor: '#635BFF', paddingVertical: 13, paddingHorizontal: 18, borderRadius: 10, marginTop: 4 },
  addButtonText: { color: '#FFFFFF', fontWeight: '700' },
  listHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  listTitle: { fontSize: 21, color: '#20243A', fontWeight: '800' },
  counter: { backgroundColor: '#EAE9FF', color: '#635BFF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 14, overflow: 'hidden', fontWeight: '700' },
  empty: { color: '#777D90', paddingVertical: 20 },
  taskCard: { backgroundColor: '#FFFFFF', borderRadius: 14, borderWidth: 1, borderColor: '#E8EAF3', padding: 16, gap: 12 },
  taskRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  checkbox: { width: 23, height: 23, borderWidth: 2, borderColor: '#C5C8D8', borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  checkboxDone: { backgroundColor: '#635BFF', borderColor: '#635BFF' },
  checkmark: { color: '#FFFFFF', fontWeight: '800' },
  taskBody: { flex: 1, gap: 5 },
  taskTitle: { fontSize: 16, color: '#20243A', fontWeight: '700' },
  completedTitle: { textDecorationLine: 'line-through', color: '#969BAD' },
  taskDescription: { color: '#777D90', fontSize: 14 },
  taskMeta: { color: '#777D90', fontSize: 12, marginTop: 4 },
  deleteButton: { alignSelf: 'flex-end', padding: 5 },
  deleteText: { color: '#C0394B', fontSize: 13, fontWeight: '600' },
});
