//import react
import React, {Component} from 'react';

//import necessary components
import {StyleSheet, View, Button, Text, TouchableOpacity} from 'react-native';

import DatePicker from '../components/datePicker.js';

import Ionicons from 'react-native-ionicons';

export default class TimeGroup extends Component {
  state = {
    selectedHours: 0,
    //initial Hours
    selectedMinutes: 0,
    //initial Minutes
    clicked: false,
    //whether to show the wheel
    textValue: `Change ${this.props.name} time`,
  };

  //00:00 instead of 0:0
  twoDigit = (number) =>
    number.toString().length === 1
      ? '0' + number.toString()
      : number.toString();

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked,
    });
    if (!this.state.clicked) {
      this.setState({
        textValue: `Confirm new ${this.props.name} time`,
      });
    } else {
      this.setState({
        textValue: `Change ${this.props.name} time`,
      });
    }
  };

  handleMinuteChange = (minutes) => {
    this.setState({selectedMinutes: minutes});
    this.props.handleSending(`${this.props.name} minutes ${minutes}`);
  };

  handleHourChange = (hours) => {
    this.setState({selectedHours: hours});
    this.props.handleSending(`${this.props.name} hours ${hours}`);
  };

  render() {
    console.log(this.props.handleSending);

    const {clicked} = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.bar}
          onPress={this.handleClick}
          activeOpacity={0.9}>
          <Text style={{color: 'rgb(15,118,239)', fontSize: 16}}>
            {this.state.textValue}
          </Text>
          <Ionicons name={this.props.icon} size={40} color={this.props.color} />
        </TouchableOpacity>

        {clicked && (
          <DatePicker
            hourChange={this.handleHourChange}
            minuteChange={this.handleMinuteChange}
            hours={this.state.selectedHours}
            minutes={this.state.selectedMinutes}
            handleSending={this.props.handleSending}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  bar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingVertical: 15,
    borderStyle: 'solid',
    borderBottomColor: 'rgb(53,54,58)',
    borderBottomWidth: 0.5,
    borderTopColor: 'rgb(53,54,58)',
    borderTopWidth: 0.5,
    backgroundColor: 'rgb(26,26,28)',
    width: '100%',
  },
});
