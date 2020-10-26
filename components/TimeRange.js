//import react
import React, {Component} from 'react';

//import necessary components
import {StyleSheet, View, Text, Alert} from 'react-native';

import TimeGroup from '../components/dateDisplayer.js';

export default class TimeRange extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TimeGroup
          name={'start'}
          handleSending={this.props.handleSending}
          icon={'ios-sunny'}
          color={'yellow'}
        />

        <TimeGroup
          name={'end'}
          handleSending={this.props.handleSending}
          icon={'ios-moon'}
          color={'silver'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
