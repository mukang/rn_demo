/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import Ping from 'react-native-ping'
import NodeList from './nodeList'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeList: NodeList
    }
  }

  componentDidMount() {
    this.fetchNodeItemDelay();
  }

  async fetchNodeItemDelay() {
    for (let index = 0; index < this.state.nodeList.length; index++) {
      const nodeItem = this.state.nodeList[index];
      const delay = await Ping.start(nodeItem.address);
      nodeItem.delay = delay;
      this.setState({
        nodeList: this.state.nodeList
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data = {this.state.nodeList}
          renderItem = {this._renderItem}
          keyExtractor = {(nodeItem) => nodeItem.address}
          extraData = {this.state}
        />
      </View>
    );
  }

  _renderItem = ({item}) => {
    console.log('--->' + item.address);
    
    return (
      <View style = {styles.cell}>
        <Text style = {styles.welcome}>{item.name + ' ' + item.delay}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 22,
  },
  list: {
    alignItems: 'center',
  },
  cell: {
    height: 100,
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    color:'#6435c9',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
