//import react
import React, {Component} from 'react';

//import necessary components
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';

import plants from './plantData.json';

import Ionicons from 'react-native-ionicons';

//react native does not support dynamic image sources, so they need to be pre-loaded
const plantImages = {
  basil: require('./plantImages/basil.jpg'),
  chamomile: require('./plantImages/chamomile.jpg'),
  rosemary: require('./plantImages/rosemary.jpg'),
  oregano: require('./plantImages/oregano.jpg'),
  coriander: require('./plantImages/coriander.jpg'),
  aniseed: require('./plantImages/aniseed.jpg'),
  dill: require('./plantImages/dill.jpg'),
  catnip: require('./plantImages/catnip.jpg'),
  chives: require('./plantImages/chives.jpg'),
  'spring onion': require('./plantImages/spring_onion.jpg'),
};

export default class Guide extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        {plants.map(({name, common_uses, light, wiki}) => (
          <PlantItem
            name={name}
            common_uses={common_uses}
            light={light}
            wiki={wiki}
            key={name}
          />
        ))}
      </View>
    );
  }
}

class PlantItem extends Component {
  state = {expanded: false};

  render() {
    const {name, common_uses, light, wiki} = this.props;

    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.name, styles.item]}
          onPress={() => this.setState({expanded: !this.state.expanded})}
          activeOpacity={0.7}>
          <Text h3 style={styles.rowTitle}>
            {name}
          </Text>
          <Ionicons
            name={
              this.state.expanded
                ? 'ios-arrow-dropup-circle'
                : 'ios-arrow-dropdown-circle'
            }
            size={32}
            color={'lightgray'}
          />
        </TouchableOpacity>

        {this.state.expanded && (
          <React.Fragment>
            <Image
              source={plantImages[name]}
              style={styles.image}
              resizeMode="cover"
            />

            <View style={[styles.uses, styles.item]}>
              <Text h4 style={styles.h4}>
                Uses
              </Text>
              <View style={styles.hr}></View>
              {common_uses.map((use) => (
                <View style={styles.usesContainer}>
                  <Ionicons name={'ios-checkmark'} size={20} color={'lime'} />
                  <Text style={styles.use}> {use}</Text>
                </View>
              ))}
            </View>

            <View style={styles.last}>
              <View style={styles.light}>
                <Text h4 style={styles.h4}>
                  Light Requirement
                </Text>
                <View style={styles.hr}></View>
                <Text style={styles.lightText}>{light} hours / day</Text>
              </View>

              <View>
                <TouchableOpacity
                  style={styles.link}
                  onPress={() => Linking.openURL(wiki)}>
                  <Text style={styles.lightText}>Further Reading</Text>
                </TouchableOpacity>
              </View>
            </View>
          </React.Fragment>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
  },
  row: {
    padding: 10,
    margin: 5,
    borderRadius: 5,

    backgroundColor: '#0b2b26',

    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  name: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowTitle: {
    color: 'white',
    fontSize: 20,
    textTransform: 'capitalize',
  },
  item: {
    padding: 10,
    margin: 5,
    backgroundColor: '#163832',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  image: {
    maxHeight: Math.min(Dimensions.get('window').height / 6, 200),
    maxWidth: Math.min(Dimensions.get('window').height / 6, 200),
    margin: 5,
    flexShrink: 1,
    flexGrow: 0.5,
    flexBasis: 'auto',
    alignSelf: 'center',
  },
  usesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  use: {
    color: 'white',
    textTransform: 'capitalize',
  },
  last: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    padding: 0,
  },
  light: {
    margin: 5,
    padding: 10,
    backgroundColor: '#163832',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  hr: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  h4: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
  },
  lightText: {
    color: 'white',
  },
  link: {
    margin: 5,
    padding: 10,
    backgroundColor: '#163832',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
