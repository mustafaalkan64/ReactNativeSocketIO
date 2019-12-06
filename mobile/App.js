/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import io from 'socket.io-client';
//import io from 'socket.io-client/dist/socket.io';



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  state = {
    onlineCount: 0,
    color: '#f1f1f1'
  };

  componentDidMount() {
    // android için cmd -> ipconfig yazıp Ethernet adapter VirtualBox Host-Only Network: ipv4 değerini alın
    // ios için http://localhost:3000

    this.io = io.connect('http://192.168.56.1:3000', {
      timeout: 10000
    });

    this.io.on('connect', function(){
      console.log('Socket connected!');
     });

     this.io.on('newUser', onlineCount => {
      this.setState({
        onlineCount,
      });
    });

    this.io.on('disUser', onlineCount => {
      this.setState({
        onlineCount,
      });
    });

  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>{this.state.onlineCount} Kullanıcı Aktif</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
