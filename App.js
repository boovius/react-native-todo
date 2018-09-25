/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Header from './header';
import Footer from './footer';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      items: []
    }
    this.handleAddItem = this.handleAddItem.bind(this)
  }

  handleAddItem() {
    if (!this.state.value) return;
    const newItems = [
      ... this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        completed: false
      }
    ]
    this.setState({items: newItems, value: ""})
    console.table(this.state.items)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header 
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={(value) => this.setState({ value })}
        />
        <View style={styles.content}>  
        </View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    ... Platform.select({
      ios: { paddingTop: 30 }
    })
  },
  content: {
    flex: 1
  }
})