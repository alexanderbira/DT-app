//import react
import React, {Component} from 'react';

//import necessary components
import {StyleSheet, View, Text} from 'react-native';

import ToggleButton from '../components/toggleButton.js';

export default class ButtonGrid extends Component {
  render() {
    return (
      <View>
        <View style={styles.container}>
          <ToggleButton
            click={this.handleClick}
            handleSending={this.props.handleSending}
            title={'Light On'}
            icon={'ios-sunny'}
            part={'light'}
            action={'on'}
          />
          <ToggleButton
            click={this.handleClick}
            handleSending={this.props.handleSending}
            title={'Light Off'}
            icon={'ios-sunny'}
            part={'light'}
            action={'off'}
          />
          <ToggleButton
            click={this.handleClick}
            handleSending={this.props.handleSending}
            title={'Aeration On'}
            icon={'ios-water'}
            part={'aeration'}
            action={'on'}
          />
          <ToggleButton
            click={this.handleClick}
            handleSending={this.props.handleSending}
            title={'Aeration Off'}
            icon={'ios-water'}
            part={'aeration'}
            action={'off'}
          />
        </View>
        <Text style={styles.description}>
          Toggling the lights will keep them toggled until they are scheduled to
          be turned on/off.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    backgroundColor: 'rgb(26,26,28)',
  },
  description: {
    color: '#999',
    padding: 10,
    fontSize: 13,
  },
});
