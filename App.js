/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import Header from './header';
import Footer from './footer';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      items: [],
      allComplete: false
    }
    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this)
  }

  handleToggleAllComplete() {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map(item => ({
      ... item, 
      complete
    }))
    this.setState({items: newItems, allComplete: complete})
    console.table(this.state.items)
  }

  handleAddItem() {
    if (!this.state.value) return;
    const newItems = [
      ... this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
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
          onToggleAllComplete={this.handleToggleAllComplete}
        />
        <View style={styles.content}>  
          <FlatList
            data={this.state.items}
            renderItem={({ item })=><Text style={styles.todo}>{item.text}</Text>}
            keyExtractor = {(item) => item.key.toString()}
          />
        </View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    ... Platform.select({
      ios: { paddingTop: 30 }
    })
  },
  content: {
    flex: 1
  },
  todo: {
    color: 'black',
    backgroundColor: 'yellow',
    fontSize: 40,
    marginTop: 10,
    textAlign: 'right',
    marginRight: 10
  }
})