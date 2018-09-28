/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, AsyncStorage } from 'react-native';
import Header from './header';
import Footer from './footer';
import Row from './row';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      items: [],
      allComplete: false,
      filter: 'ALL'
    }
    this.setSource = this.setSource.bind(this)
    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this)
    this.handleToggleComplete = this.handleToggleComplete.bind(this)
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.filteredItems = this.filteredItems.bind(this)
  }

  componentWillMount(){
    AsyncStorage.getItem("items").then(json => {
      try {
        const items = JSON.parse(json);
        this.setSource({items});
      } catch(e) {
        console.log('an error occured', e)
      }
    })
  }

  setSource(state) {
    this.setState(state, ()=>{
      AsyncStorage.setItem("items", JSON.stringify(this.state.items));
    })
  }

  handleToggleComplete(key, complete) {
    const newItems = this.state.items.map(item => {
      if (key !== item.key) return item;
      return {
        ...item,
        complete: !complete
      }
    })
    this.setSource({ items: newItems })
  }

  handleToggleAllComplete() {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map(item => ({
      ... item, 
      complete
    }))
    this.setSource({items: newItems, allComplete: complete});
  }

  handleDeleteTodo(key) {
    const newItems = this.state.items.filter(item => key !== item.key)
    this.setSource({items: newItems})
  }

  handleAddItem() {
    if (!this.state.value) return;
    const newItems = [
      ... this.state.items,
      {
        key: Date.now().toString(),
        text: this.state.value,
        complete: false
      }
    ]
    this.setSource({items: newItems, value: ""})
  }

  handleFilter(filter) {
    this.setSource({filter})
  }

  filteredItems() {
    if (this.state.filter === 'ALL') return this.state.items;
    if (this.state.filter === 'COMPLETED') {
      return this.state.items.filter(item => item.complete === true)
    } else {
      return this.state.items.filter(item => item.complete !== true)
    }
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
            data={this.filteredItems()}
            renderItem={({ item }) =>
              <Row 
                onToggleComplete={()=> 
                  this.handleToggleComplete(item.key, item.complete)
                }
                onDelete={()=>this.handleDeleteTodo(item.key)}
                {...item}
              />
            }
          />
        </View>
        <Footer filter={this.state.filter} filterTodos={this.handleFilter} />
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