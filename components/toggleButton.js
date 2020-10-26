//import react
import React, {Component} from 'react';

//import necessary components
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import Ionicons from 'react-native-ionicons';

export default class ToggleButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          this.props.handleSending(`${this.props.part} ${this.props.action}`)
        }>
        <Ionicons
          name={this.props.icon}
          size={40}
          color={
            this.props.action === 'off'
              ? '#444444'
              : this.props.part === 'light'
              ? 'yellow'
              : 'cyan'
          }
        />
        <Text
          style={{color: 'rgb(15,118,239)', textAlign: 'center', fontSize: 16}}>
          {' '}
          {this.props.title}{' '}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 0.5,
    padding: 20,
    borderColor: 'rgb(53,54,58)',
  },
});
