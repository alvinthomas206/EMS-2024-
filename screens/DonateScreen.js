import React, { Component } from 'react';
import {
  View,
  StyleSheet,

  FlatList,
  TouchableOpacity,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader';

import {ViewPropTypes , Text,} from 'deprecated-react-native-prop-types';

import db from '../config';

export default class DonateScreen extends Component {
  constructor() {
    super();
    this.state = {
      allRequests: [],
    };
    this.requestRef = null;
  }

  getAllRequests = () => {
    this.requestRef = db
      .collection('Medicinerequests')
      .where('medicineStatus', '==', 'requested')
      .onSnapshot((snapshot) => {
        var allRequests = [];
        snapshot.forEach((doc) => {
          allRequests.push(doc.data());
        });
        this.setState({ allRequests: allRequests });
      });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.medicinename}
        subtitle={item.description}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('ReceiverDetailsScreen', {
                details: item,
              });
            }}>
            <Text style={{ color: '#ffff' }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };

  componentDidMount() {
    this.getAllRequests();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="EMS App" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          {this.state.allRequests.length === 0 ? (
            <View
              style={{
                flex: 1,
                fontSize: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 20 }}>
                List of all Medicine Requests
              </Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allRequests}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1200F4',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
});
