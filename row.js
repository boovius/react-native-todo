import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

export default class Row extends Component {
  render() {
    const { complete, text, onToggleComplete, onDelete } = this.props;
    return (
      <View style={styles.todoRow}>
        <Switch 
          value={complete} 
          onValueChange={onToggleComplete}
        />
        <View style={styles.todoTextWrapper}>
          <Text style={[styles.todoText, complete && styles.complete]}>{text}</Text>
        </View>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.destroy}>X</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  todoRow: {
    flexDirection: 'row',
    paddingLeft: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoTextWrapper: {
    flex: 1,
    paddingLeft: 16, 
  },
  todoText: {
    color: '#b3b3b3',
    fontSize: 24,
  },
  complete: {
    textDecorationLine: 'line-through'
  },
  destroy: {
    color: '#cc9e9e',
    marginRight: 16,
    fontSize: 24,
  }
})