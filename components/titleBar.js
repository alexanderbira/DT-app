//import react
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class TitleBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>
          Plantr 🌱
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    backgroundColor: 'rgb(27,27,27)',
    borderStyle: 'solid',
    borderBottomColor: 'rgb(53,54,58)',
    borderBottomWidth: 1,
  },
});
