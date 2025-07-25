// store/useTasks.js
import { create } from 'zustand';
import * as Notifications from 'expo-notifications';
import { persist } from './persist';
import uuid from 'react-native-uuid';

const STORAGE_KEY = 'TASKS_v1';

export const useTasks = create(
  persist(STORAGE_KEY, {
    tasks: [],
    theme: 'auto', // 'light' | 'dark' | 'auto'
    search: '',
    filter: 'all', // 'all' | 'done' | 'todo'

    /* -------- actions -------- */
    addTask: async (title, opts = {}) => set => {
      const id = uuid.v4();
      let reminderId = null;

      /* schedule local push if reminderAt provided */
      if (opts.reminderAt) {
        reminderId = await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Task Reminder',
            body: title,
            data: { id },
          },
          trigger: opts.reminderAt,
        });
      }

      set(state => ({
        tasks: [
          ...state.tasks,
          { id, title, completed: false, ...opts, reminderId },
        ],
      }));
    },

    toggleDone: id => set(state => ({
      tasks: state.tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    })),

    deleteTask: id => set(state => {
      const t = state.tasks.find(k => k.id === id);
      if (t?.reminderId) Notifications.cancelScheduledNotificationAsync(t.reminderId);
      return { tasks: state.tasks.filter(k => k.id !== id) };
    }),

    updateOrder: newData => set({ tasks: newData }),

    setSearch: search => set({ search }),
    setFilter: filter => set({ filter }),
    toggleTheme: () => set(state => ({
      theme: state.theme === 'dark' ? 'light' : 'dark',
    })),
  })
);
