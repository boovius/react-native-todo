import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { onAddItem, onChange, onToggleAllComplete, value } = this.props;
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={onToggleAllComplete}>
          <Text style={styles.toggleIcon}>{String.fromCharCode(10003)}</Text>
        </TouchableOpacity>
        <TextInput
          value={value}
          onChangeText={onChange}
          onSubmitEditing={onAddItem}
          placeholder="what needs to be done?"
          blurOnSubmit={false}
          returnKeyType="done"
          style={styles.input}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  toggleIcon: {
    fontSize: 30,
    color: "#CCC"
  },
  input: {
    flex: 1,
    marginLeft: 16,
    height: 50
  }
})
