import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TimePicker from 'react-native-simple-time-picker';

export default class DatePicker extends Component {
  render() {
    console.log(this.props.handleSending);

    return (
      <View style={styles.container}>
        <TimePicker
          selectedHours={this.props.hours}
          //initial Hourse value
          selectedMinutes={this.props.minutes}
          //initial Minutes value
          onChange={(hours, minutes) => {
            this.props.hourChange(hours);
            this.props.minuteChange(minutes);
          }}
          handleSending={this.props.handleSending}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(26,26,28)',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: '50%',
    borderStyle: 'solid',
    borderBottomColor: 'rgb(53,54,58)',
    borderBottomWidth: 0.5,
  },
});
