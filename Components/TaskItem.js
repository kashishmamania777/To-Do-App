// components/TaskItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useTheme } from 'react-native-paper';

export default function TaskItem({ item, drag, isActive, onPress }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.row,
        { backgroundColor: isActive ? colors.primaryContainer : colors.surface },
      ]}
      onLongPress={drag}
      delayLongPress={150}
      onPress={onPress}
    >
      <Checkbox
        value={item.completed}
        onValueChange={() => onPress('toggle')}
        color={colors.primary}
      />
      <View style={styles.info}>
        <Text
          style={[
            styles.title,
            { color: colors.onSurface },
            item.completed && { textDecorationLine: 'line-through' },
          ]}
        >
          {item.title}
        </Text>
        {!!item.due && (
          <Text style={[styles.meta, { color: colors.onSurfaceVariant }]}>
            📅 {new Date(item.due).toLocaleDateString()}
          </Text>
        )}
      </View>
      <Text style={{ color: colors.outline }}>
        {item.priority === 'high'
          ? '⬆️'
          : item.priority === 'low'
          ? '⬇️'
          : '−'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 14,
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 4,
  },
  info: { flex: 1, marginLeft: 12 },
  title: { fontSize: 16, fontWeight: '500' },
  meta: { fontSize: 12 },
});
