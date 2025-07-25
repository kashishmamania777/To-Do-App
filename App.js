// App.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  StatusBar,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Provider as PaperProvider, FAB, Text, IconButton } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import { useTasks } from './store/useTasks';
import { dark, light } from './theme';
import TaskItem from './components/TaskItem';
import TaskModal from './components/TaskModal';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldSetBadge: false,
    shouldPlaySound: false,
  }),
});

export default function App() {
  /* Zustand selectors */
  const {
    tasks,
    addTask,
    toggleDone,
    deleteTask,
    updateOrder,
    search,
    setSearch,
    filter,
    setFilter,
    theme,
    toggleTheme,
  } = useTasks(state => state);

  const [modal, setModal] = useState(false);

  /* filtered list */
  const list = tasks
    .filter(t => {
      if (filter === 'done') return t.completed;
      if (filter === 'todo') return !t.completed;
      return true;
    })
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <PaperProvider theme={theme === 'dark' ? dark : light}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text variant="headlineMedium">My Tasks</Text>
          <IconButton
            icon={theme === 'dark' ? 'weather-sunny' : 'moon-waxing-crescent'}
            onPress={toggleTheme}
          />
        </View>

        {/* Search box */}
        <TextInput
          placeholder="Search…"
          style={styles.search}
          value={search}
          onChangeText={setSearch}
        />

        {/* Filter buttons */}
        <View style={styles.filters}>
          {[
            ['all', 'All'],
            ['todo', 'Pending'],
            ['done', 'Completed'],
          ].map(([key, label]) => (
            <Text
              key={key}
              onPress={() => setFilter(key)}
              style={[
                styles.filterBtn,
                filter === key && styles.filterActive,
              ]}
            >
              {label}
            </Text>
          ))}
        </View>

        {/* Draggable list */}
        <DraggableFlatList
          data={list}
          keyExtractor={item => item.id}
          onDragEnd={({ data }) => updateOrder(data)}
          renderItem={({ item, drag, isActive, getIndex }) => (
            <TaskItem
              item={item}
              drag={drag}
              isActive={isActive}
              onPress={action => {
                if (action === 'toggle') toggleDone(item.id);
              }}
            />
          )}
          contentContainerStyle={{ paddingBottom: 120 }}
        />

        {/* FAB */}
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => setModal(true)}
        />
        <TaskModal
          visible={modal}
          onDismiss={() => setModal(false)}
          onSave={addTask}
        />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  search: {
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 4,
  },
  filterBtn: { padding: 8, opacity: 0.6 },
  filterActive: { opacity: 1, fontWeight: '600' },
  fab: { position: 'absolute', right: 20, bottom: 40 },
});
