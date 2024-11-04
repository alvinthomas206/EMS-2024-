import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';
import PreebookDetials from './PreebookDetials';

import db from '../config';

export default class Purchase extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: firebase.auth().currentUser.email,
      allPurchase_User: [],
      allPurchase_Shop: [],
    };
    this.requestRef = null;
  }

  getDonorDetails = () => {
    db.collection('users')
      .where('username', '==', this.state.currentUser)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            userType: doc.data().userType,
          });
        });
      });
  };



  getallPurchase_Shop = () => {
    this.requestRef = db
      .collection('YourPreebook')
      .where('shopId', '==', this.state.currentUser)
      .where('request_status', '==', 'delivered')
      .onSnapshot((snapshot) => {
        var allPurchase_Shop = [];
        snapshot.forEach((doc) => {
          allPurchase_Shop.push(doc.data());
        });

        this.setState({ allPurchase_Shop: allPurchase_Shop });
      });
  };



  getallPurchase_User = () => {
    this.requestRef = db
      .collection('YourPreebook')
      .where('username', '==', this.state.currentUser)
      .where('request_status', '==', 'delivered')
      .onSnapshot((snapshot) => {
        var allPurchase_User = [];
        snapshot.forEach((doc) => {
          allPurchase_User.push(doc.data());
        });

        this.setState({ allPurchase_User: allPurchase_User });
      });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.medicinename}
        subtitle={item.storeName}
        description={item.item_value}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('PurchaseDetials', {
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
    this.getDonorDetails();
    this.getallPurchase_User();
    this.getallPurchase_Shop();
 
  }

  componentWillUnmount() {
    this.requestRef();
  }

  render() {
    if (this.state.userType === 'user') {
      return (
        <View style={{ flex: 1 }}>
          <MyHeader title="My Purchase" navigation={this.props.navigation} />
          <View style={{ flex: 1 }}>
            {this.state.allPurchase_User.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  fontSize: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 20 }}>No Purchase Record </Text>
              </View>
            ) : (
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allPurchase_User}
                renderItem={this.renderItem}
              />
            )}
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <MyHeader title="Purchase" navigation={this.props.navigation} />
          <View style={{ flex: 1 }}>
            {this.state.allPurchase_Shop.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  fontSize: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 20 }}>No Purchase Record </Text>
              </View>
            ) : (
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allPurchase_Shop}
                renderItem={this.renderItem}
              />
            )}
          </View>
        </View>
      );
    }
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
