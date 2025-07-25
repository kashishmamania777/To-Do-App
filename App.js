import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Checkbox, IconButton, Chip } from 'react-native-paper';

export default function TaskItem({ task, onDrag, onToggle, onEdit, onDelete, theme }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#FF5252';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return theme.colors.outline;
    }
  };

  return (
    <Card style={styles.card} mode="elevated">
      <TouchableOpacity
        onLongPress={onDrag}
        onPress={onEdit}
        delayLongPress={200}
        style={styles.cardContent}
      >
        <View style={styles.mainContent}>
          <View style={styles.leftSection}>
            <Checkbox
              status={task.completed ? 'checked' : 'unchecked'}
              onPress={onToggle}
              color={theme.colors.primary}
            />
            <View style={styles.textContent}>
              <Text 
                variant="bodyLarge" 
                style={[
                  styles.title,
                  { color: theme.colors.onSurface },
                  task.completed && styles.completedText
                ]}
              >
                {task.title}
              </Text>
              {task.description && (
                <Text 
                  variant="bodySmall" 
                  style={[
                    styles.description,
                    { color: theme.colors.onSurfaceVariant },
                    task.completed && styles.completedText
                  ]}
                >
                  {task.description}
                </Text>
              )}
            </View>
          </View>
          <IconButton
            icon="delete"
            size={20}
            iconColor={theme.colors.error}
            onPress={onDelete}
          />
        </View>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
    marginHorizontal: 2,
  },
  cardContent: {
    padding: 16,
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textContent: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontWeight: '600',
    lineHeight: 20,
  },
  description: {
    marginTop: 4,
    lineHeight: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
});
