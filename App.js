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
import Row from './row';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      items: [],
      allComplete: false
    }
    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleToggleComplete = this.handleToggleComplete.bind(this)
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this)
  }

  handleToggleComplete(key, complete) {
    const newItems = this.state.items.map(item => {
      if (key !== item.key) return item;
      return {
        ...item,
        complete: !complete
      }
    })
    this.setState({ items: newItems })
  }

  handleToggleAllComplete() {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map(item => ({
      ... item, 
      complete
    }))
    this.setState({items: newItems, allComplete: complete});
  }

  handleAddItem() {
    if (!this.state.value) return;
    const newItems = [
      ... this.state.items,
      {
        key: Date.now().toString(),
        thing: Date.now(),
        text: this.state.value,
        complete: false
      }
    ]
    this.setState({items: newItems, value: ""})
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
            ItemSeparatorComponent={({highlighted}) => (
              <View style={[styles.separator, highlighted && {marginLeft: 0}]} />
            )} 
            data={this.state.items}
            renderItem={({ item }) =>
              <Row 
                onToggleComplete={()=> 
                  this.handleToggleComplete(item.key, item.complete)
                }
                {...item}
              />
            }
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
  separator: {
    height: 50,
  }
})