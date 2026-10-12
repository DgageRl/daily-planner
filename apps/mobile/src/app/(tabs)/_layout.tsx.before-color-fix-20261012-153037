import { Tabs } from 'expo-router';
import { Text, Platform } from 'react-native';

function TabIcon({ emoji, color }: { emoji: string; color: string }) {
  return (
    <Text
      style={{
        fontSize: 23,
        color,
        textAlign: 'center',
        lineHeight: 29,
      }}
    >
      {emoji}
    </Text>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6B5CE7',
        tabBarInactiveTintColor: '#9293A7',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          marginTop: 2,
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E9EAF3',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 84 : 66,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Заметки',
          tabBarLabel: 'Заметки',
          tabBarIcon: ({ color }) => <TabIcon emoji="📝" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Задачи',
          tabBarLabel: 'Задачи',
          tabBarIcon: ({ color }) => <TabIcon emoji="☑️" color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Календарь',
          tabBarLabel: 'Календарь',
          tabBarIcon: ({ color }) => <TabIcon emoji="📅" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{ href: null }}
      />
    </Tabs>
  );
}
