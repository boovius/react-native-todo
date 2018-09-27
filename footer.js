import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { filter, filterTodos } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.filters}>
          <TouchableOpacity 
            style={[styles.filter, filter === 'ALL' && styles.selected]}
            onPress={()=>filterTodos('ALL')}            
          >
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filter, filter === 'ACTIVE' && styles.selected]}
            onPress={()=>filterTodos('ACTIVE')}            
          >
            <Text>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filter, filter === 'COMPLETED' && styles.selected]}
            onPress={()=>filterTodos('COMPLETED')}            
          >
            <Text>Completed</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ddd',
    alignItems: 'center',
    padding: 16,
  },
  filters: {
    flexDirection: 'row',
  },
  filter: {
    padding: 8,
    borderRadius: 5,
    borderColor: 'transparent',
    borderWidth: 1,
  },
  selected: {
    borderColor: 'rgba(175, 47, 47, .2)'
  }
})