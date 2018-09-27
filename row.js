import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default class Row extends Component {
  render() {
    const { complete, text, onToggleComplete } = this.props;
    return (
      <View style={styles.todoRow}>
        <Switch 
          value={complete} 
          onValueChange={onToggleComplete}
        />
        <Text style={[styles.todoText, complete && styles.complete]}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  todoRow: {
    flexDirection: 'row',
    paddingLeft: 16,
  },
  todoText: {
    color: '#b3b3b3',
    fontSize: 24,
    paddingLeft: 16,
  },
  complete: {
    textDecorationLine: 'line-through'
  }
})