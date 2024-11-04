import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import db from '../config.js';

export default class ShopDetials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: firebase.auth().currentUser.email,
      medicine_value: this.props.navigation.getParam('details')[ 'medicine_value'],
      shopId: this.props.navigation.getParam('details')['shopId'],
      medicineId: this.props.navigation.getParam('details')['medicineId'],
      medicinename: this.props.navigation.getParam('details')['medicinename'],
      available: this.props.navigation.getParam('details')['medicine_status'],
      nickName: this.props.navigation.getParam('details')['nickName'],
      description: this.props.navigation.getParam('details')['description'],
      storeName: '',
      price: '',
      mobile_number: '',
      shopPhoneNumber: '',
      receiverAshopAddressddress: '',
      receiverRequestDocId: '',
      ownerName: '',
      map: '',
      upi: '',
    };
  }

  getUserDetails = (currentUser) => {
    db.collection('users')
      .where('username', '==', currentUser)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            fullName: doc.data().first_name + ' ' + doc.data().last_name,
            userType: doc.data().userType,
          });
        });
      });
  };




  getCurrentDateandTime = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var timehour = new Date().getHours();
    var timemin = new Date().getMinutes();
    var timesec = new Date().getSeconds();
    this.setState({
      date: date + '-' + month + '-' + year,
      time: timehour + ':' + timemin + ':' + timesec,
    });
  };



  getShopDetails() {
    db.collection('users')
      .where('username', '==', this.state.shopId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            storeName: doc.data().storeName,
            ownerName: doc.data().ownerName,
            mobile_number: doc.data().mobile_number,
            shopAddress: doc.data().address,
            shopPhoneNumber: doc.data().shopPhoneNumber,
            map: doc.data().map,
            upi: doc.data().upi,
          });
        });
      });
  }



  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }




  addPreebook = () => {
    var preebookId = this.createUniqueId();

    db.collection('YourPreebook').add({
      username: this.state.currentUser,
      shopId: this.state.shopId,
      description: this.state.description,
      nickName: this.state.nickName,
      preebookId: preebookId,
      medicinename: this.state.medicinename,
      storeName: this.state.storeName,
      mobile_number: this.state.mobile_number,
      shopPhoneNumber: this.state.shopPhoneNumber,
      shopAddress: this.state.shopAddress,
      ownerName: this.state.ownerName,
      map: this.state.map,
      upi: this.state.upi,
      medicine_value: this.state.medicine_value,
      request_status: "Preebooked",
      date: this.state.date,
      time: this.state.time,
    });
    return Alert.alert('Preebooked Successfully', '', [
      {
        text: 'OK',
        onPress: () => {
          this.props.navigation.navigate('YourPreebook');
        },
      },
    ]);
  };




  addNotification = () => {
    var message = this.state.fullName + ' has preebooked medicine';
    db.collection('all_notifications').add({
      'targeted_user_id': this.state.shopId,
      'preebookedUser': this.state.currentUser,
      'medicineId': this.state.medicineId,
      'medicinename': this.state.medicinename,
      'date': this.state.date,
      'notification_status': 'unread',
      'message': message,
    });
  };
  componentDidMount() {
    this.getShopDetails();
    this.getCurrentDateandTime();
    this.getUserDetails(this.state.currentUser);
  }


  render() {
    if (this.state.userType === 'user') {
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={{ flex: 0.1 }}>
              <Header
                leftComponent={
                  <Icon
                    name="arrow-left"
                    type="feather"
                    color="#ffff"
                    onPress={() => this.props.navigation.goBack()}
                  />
                }
                centerComponent={{
                  text: 'ShopDetials',
                  style: { color: '#ffff', fontSize: 20, fontWeight: 'bold' },
                }}
                backgroundColor="#1200F4"
              />
            </View>

            <View style={{ flex: 0.3, marginTop: RFValue(20) }}>
              <Card
                title={'Medicine Information'}
                titleStyle={{ fontSize: 20 }}>
                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Name : {this.state.medicinename}
                  </Text>
                </Card>
                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Nick Name : {this.state.nickName}
                  </Text>
                </Card>
                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Description : {this.state.description}
                  </Text>
                </Card>
                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Medicine Price : {this.state.medicine_value}
                  </Text>
                </Card>
                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Is Medicine Available : {this.state.available}
                  </Text>
                </Card>
              </Card>
            </View>

            <View style={{ flex: 0.3 }}>
              <Card title={'Shop Information'} titleStyle={{ fontSize: 30 }}>
                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Shop Name: {this.state.storeName}
                  </Text>
                </Card>
                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Owner Name: {this.state.ownerName}
                  </Text>
                </Card>

                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Shop Phone Number: {this.state.shopPhoneNumber}
                  </Text>
                </Card>

                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Phone Number 2: {this.state.mobile_number}
                  </Text>
                </Card>

                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Address: {this.state.shopAddress}
                  </Text>
                </Card>

                <Card>
                  <Text style={{ fontWeight: 'bold' }} onPress={{}}>
                    Google Map Link: {this.state.map}
                  </Text>
                </Card>

                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Upi: {this.state.upi}
                  </Text>
                </Card>
              </Card>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.addPreebook();
                  this.addNotification();
                  this.props.navigation.navigate('YourPreebook');
                }}>
                <Text style={{ color: '#ffff' }}> Preebook</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={{ flex: 0.1 }}>
              <Header
                leftComponent={
                  <Icon
                    name="arrow-left"
                    type="feather"
                    color="#ffff"
                    onPress={() => this.props.navigation.goBack()}
                  />
                }
                centerComponent={{
                  text: 'ShopDetials',
                  style: { color: '#ffff', fontSize: 20, fontWeight: 'bold' },
                }}
                backgroundColor="#1200F4"
              />
            </View>

            <View style={{ flex: 0.3, marginTop: RFValue(20) }}>
              <Card
                title={'Medicine Information'}
                titleStyle={{ fontSize: 20 }}>
                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Name : {this.state.medicinename}
                  </Text>
                </Card>
                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Nick Name : {this.state.nickName}
                  </Text>
                </Card>
                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Description : {this.state.description}
                  </Text>
                </Card>
                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Medicine Price : {this.state.medicine_value}
                  </Text>
                </Card>
                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Is Medicine Available : {this.state.available}
                  </Text>
                </Card>
              </Card>
            </View>

            <View style={{ flex: 0.3 }}>
              <Card title={'Shop Information'} titleStyle={{ fontSize: 30 }}>
                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Shop Name: {this.state.storeName}
                  </Text>
                </Card>
                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Owner Name: {this.state.ownerName}
                  </Text>
                </Card>

                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Shop Phone Number: {this.state.shopPhoneNumber}
                  </Text>
                </Card>

                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Phone Number 2: {this.state.mobile_number}
                  </Text>
                </Card>

                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Address: {this.state.receiverAddress}
                  </Text>
                </Card>

                <Card>
                  <Text style={{ fontWeight: 'bold' }} onPress={{}}>
                    Google Map Link: {this.state.map}
                  </Text>
                </Card>

                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Upi: {this.state.upi}
                  </Text>
                </Card>
              </Card>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={{ color: '#ffff' }}>
                  Shop Owner Cannot Preebook
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(30),
    marginBottom: 10,
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#1200F4',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
});
