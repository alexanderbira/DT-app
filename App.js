import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-ionicons';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {DarkTheme} from '@react-navigation/native';
import React, {Component} from 'react';
import {BleManager} from 'react-native-ble-plx';
import {Notifications} from 'react-native-notifications';

import TimeRange from './components/TimeRange.js';
import TitleBar from './components/titleBar.js';
import ButtonGrid from './components/buttonGrid.js';
import Guide from './components/guide.js';

let sendData;

function _utf8_encode(string) {
  string = string.replace(/\r\n/g, '\n');
  var utftext = '';

  for (var n = 0; n < string.length; n++) {
    var c = string.charCodeAt(n);

    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }
  }

  return utftext;
}

// public method for encoding
function encode(input) {
  var _keyStr =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var output = '';
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;

  input = _utf8_encode(input);

  while (i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output =
      output +
      _keyStr.charAt(enc1) +
      _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) +
      _keyStr.charAt(enc4);
  }

  return output;
}

const Tab = createBottomTabNavigator();

export default class App extends Component {
  constructor() {
    super();
    this.manager = new BleManager();
  }

  state = {connected: false};

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {

        switch (error.toString()) {
          case 'BleError: BluetoothLE is powered off':
            Alert.alert(
              'Could not connect to Plantr device',
              'Ensure the device this app is on has bluetooth turned on',
              [
                {
                  text: 'Open settings',
                  onPress: () => Linking.openURL('App-Prefs:Bluetooth'),
                  style: 'cancel',
                },
              ],
            );
        }
        return;
      }

      if (device.name === 'ABRPi') {
        this.manager.stopDeviceScan();

        device
          .connect()

          .then((device) => {
            return device.discoverAllServicesAndCharacteristics();
          })
          .then((device) => {
            sendData = (text) => {
              device.writeCharacteristicWithResponseForService(
                '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
                '6e400002-b5a3-f393-e0a9-e50e24dcca9e',
                encode(
                  `"${new Date().getDate()} ${
                    [
                      'Jan',
                      'Feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      'Dec',
                    ][new Date().getMonth()]
                  } ${new Date().getFullYear()} ${(
                    '0' + new Date().getHours()
                  ).slice(-2)}:${('0' + new Date().getMinutes()).slice(-2)} " ` +
                    text,
                ),
              );
            };
            try {
              toggleState();
            } catch {
              Alert.alert(
                'Sorry for the inconvenience',
                'Due to the way this app was coded, you have to open the lights menu before scanning for Plantr devices. Please dismiss this alert, open the lights tab, and try again.',
              );
            }

            Alert.alert('Plantr device connected!');
          })
          .catch((error) => {
            Alert.alert(error.message);
          });
      }
    });
  }

  render() {
    return (
      <NavigationContainer theme={DarkTheme}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Lights') {
                iconName = focused ? 'ios-bulb' : 'ios-bulb';
              } else if (route.name === 'Toggles') {
                iconName = focused ? 'ios-switch' : 'ios-switch';
              } else if (route.name === 'Guide') {
                iconName = focused
                  ? 'ios-information-circle-outline'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Website') {
                iconName = focused ? 'ios-globe' : 'ios-globe';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'lime',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Guide" component={GuideScreen} />
          <Tab.Screen name="Lights" component={Lights} />
          <Tab.Screen name="Toggles" component={Toggles} />
          <Tab.Screen name="Website" component={Website} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

class DisconnectedText extends App {
  render() {
    return (
      <React.Fragment>
        <Text style={styles.description}>
          Connect your device to gain access to remote controls.
        </Text>
        {this.props.search && (
          <TouchableOpacity
            onPress={() => this.scanAndConnect()}
            style={styles.bar}
            activeOpacity={0.7}>
            <Text style={{color: 'rgb(15,118,239)'}}>
              Click to find and connect to device
            </Text>
            <Ionicons name={'ios-search'} size={32} color={'lightgray'} />
          </TouchableOpacity>
        )}
        {!this.props.search && (
          <Text style={styles.description}>
            Go to the toggles menu to connect to a device.
          </Text>
        )}
        <TouchableOpacity
          style={styles.description}
          onPress={() =>
            Linking.openURL(
              'https://Plantr.alexanderbirabe.repl.co/troubleshooting',
            )
          }>
          <Text style={{color: 'rgb(15,118,239)'}}>
            If you are not able to connect to your Plantr, click here for
            troubleshooting.
          </Text>
        </TouchableOpacity>
      </React.Fragment>
    );
  }
}

function lightState() {
  this.setState({connected: true});
}

class Lights extends Component {
  constructor() {
    super();
    Notifications.registerRemoteNotifications();

    Notifications.events().registerNotificationOpened(
      (notification: Notification, completion) => {
        Alert.alert(
          'Repeat Notification',
          'Would you like to schedule a new top-up reminder for 2 weeks from now?',
          [
            {
              text: 'Yes',
              onPress: this.queueNotification,
            },
            {
              text: 'No',
            },
          ],
        );
        completion();
      },
    );

    lightState = lightState.bind(this);
  }

  state = {connected: false};

  queueNotification() {
    let localNotification = Notifications.postLocalNotification({
      body:
        'Make sure that the water level in your Plantr is high enough, and re-schedule a reminder in the app.',
      title: 'Time to refill your water',
      silent: false,
      fireDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).getTime(),
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TitleBar />

        <ScrollView style={styles.scroller}>
          <Text style={styles.title}>Lights</Text>

          {this.state.connected && (
            <React.Fragment>
              <TimeRange handleSending={(text) => sendData(text)} />
              <Text style={styles.description}>
                When you turn a time scroller, the new time is sent to the
                Plantr. The Plantr will turn the light on and off at the
                specified times, unless toggled. In this case it will wait until
                it was next scheduled to turn on/off.
              </Text>
            </React.Fragment>
          )}
          {!this.state.connected && <DisconnectedText search={false} />}

          <Text style={styles.title}>Notifications</Text>
          <TouchableOpacity
            style={styles.bar}
            onPress={() => {
              this.queueNotification();
              Alert.alert('Reminder set!');
            }}>
            <Text style={{color: 'rgb(15,118,239)'}}>
              Click to receive water top-up notification
            </Text>
          </TouchableOpacity>
          <Text style={styles.description}>
            Water top-up notifications will send 2 weeks after scheduled,
            reminding you to check the water level in your Plantr system and to
            schedule a new notification.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function toggleState() {
  lightState();
  this.setState({connected: true});
}

class Toggles extends Component {
  constructor() {
    super();
    toggleState = toggleState.bind(this);
  }

  state = {connected: false};

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TitleBar />

        <ScrollView style={styles.scroller}>
          <Text style={styles.title}>Toggles</Text>

          {this.state.connected && (
            <ButtonGrid handleSending={(text) => sendData(text)} />
          )}
          {!this.state.connected && <DisconnectedText search={true} />}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

class GuideScreen extends App {
  constructor() {
    super();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TitleBar />

        <ScrollView style={styles.scroller}>
          <Text style={styles.title}>Guide for Growing </Text>

          <Text style={styles.description}>
            You can either view the guides for plants you can grow in the
            website, or below:
          </Text>

          <Guide />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

class Website extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TitleBar />
        <ScrollView style={styles.scroller}>
          <Text style={styles.title}>Website</Text>
          <Text style={styles.description}>
            You can either view the guides for plants you can grow in this
            website, in the guide tab.
          </Text>
          <TouchableOpacity
            style={styles.bar}
            onPress={() =>
              Linking.openURL('https://Plantr.alexanderbirabe.repl.co')
            }>
            <Text
              style={{
                color: 'rgb(15,118,239)',
                textAlign: 'left',
                fontSize: 16,
                paddingLeft: 10,
              }}>
              Click here to open the website{' '}
            </Text>
            <Ionicons name={'ios-open'} size={32} color={'lightgray'} />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    height: '100%',
  },
  scroller: {
    display: 'flex',
    backgroundColor: 'rgb(8,8,8)',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 20,
  },
  description: {
    color: '#999',
    padding: 10,
    fontSize: 13,
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
