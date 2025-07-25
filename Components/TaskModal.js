// components/TaskModal.js
import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Modal, Button, Text, RadioButton, useTheme } from 'react-native-paper';

export default function TaskModal({ visible, onDismiss, onSave }) {
  const { colors } = useTheme();
  const [title, setTitle] = useState('');
  const [due, setDue] = useState(null);
  const [showDate, setShowDate] = useState(false);
  const [priority, setPriority] = useState('normal');
  const [reminder, setReminder] = useState(false);

  const reset = () => {
    setTitle('');
    setDue(null);
    setPriority('normal');
    setReminder(false);
  };

  const save = () => {
    if (!title.trim()) return;
    onSave(title.trim(), {
      due,
      priority,
      reminderAt: reminder
        ? { seconds: 1, repeats: false } /* override below */
        : null,
    });
    reset();
    onDismiss();
  };

  return (
    <Modal visible={visible} onDismiss={onDismiss}>
      <View style={[styles.card, { backgroundColor: colors.elevation.level2 }]}>
        <Text variant="titleLarge">New Task</Text>
        <TextInput
          placeholder="What needs to be done?"
          style={[styles.input, { color: colors.onSurface }]}
          value={title}
          onChangeText={setTitle}
        />
        <Pressable onPress={() => setShowDate(true)}>
          <Text style={{ color: colors.primary }}>
            {due ? `Due: ${new Date(due).toLocaleDateString()}` : 'Add due-date'}
          </Text>
        </Pressable>

        {showDate && (
          <DateTimePicker
            value={due ? new Date(due) : new Date()}
            onChange={(e, d) => {
              setShowDate(Platform.OS === 'ios');
              if (d) setDue(d.toISOString());
            }}
          />
        )}

        <Text style={{ marginTop: 12, marginBottom: 4 }}>Priority</Text>
        <RadioButton.Group
          onValueChange={setPriority}
          value={priority}
        >
          <View style={styles.row}>
            {['low', 'normal', 'high'].map(p => (
              <View key={p} style={styles.row}>
                <RadioButton value={p} />
                <Text>{p}</Text>
              </View>
            ))}
          </View>
        </RadioButton.Group>

        <Button
          mode="contained"
          onPress={save}
          style={{ marginTop: 16 }}
        >
          Save
        </Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  card: { padding: 24, borderRadius: 16, margin: 24 },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  row: { flexDirection: 'row', alignItems: 'center', marginRight: 16 },
});
