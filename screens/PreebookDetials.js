import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import db from '../config.js';

export default class PreebookDetials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: firebase.auth().currentUser.email,
      userId: this.props.navigation.getParam('details')['username'],
      shopId: this.props.navigation.getParam('details')['shopId'],
      preebookId: this.props.navigation.getParam('details')['preebookId'],
      medicinename: this.props.navigation.getParam('details')['medicinename'],
      available: this.props.navigation.getParam('details')['medicine_status'],
      nickName: this.props.navigation.getParam('details')['nickName'],
      date: this.props.navigation.getParam('details')['date'],
      time: this.props.navigation.getParam('details')['time'],
      description: this.props.navigation.getParam('details')['description'],
      docId: '',
      storeName: '',
      price: '',
      mobile_number: '',
      shopPhoneNumber: '',
      shopAddress: '',
      receiverRequestDocId: '',
      ownerName: '',
      map: '',
      upi: '',
      userType: '',
      userfullName: '',
      address: '',
      usermobile_number: '',
    };
  }

  getcurrentUserDetails = (currentUser) => {
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

  getuserDetials = () => {
    db.collection('users')
      .where('username', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            userfullName: doc.data().first_name + ' ' + doc.data().last_name,
            address: doc.data().address,
            usermobile_number: doc.data().mobile_number,
          });
        });
      });
  };

  getdocId = () => {
    db.collection('YourPreebook')
      .where('preebookId', '==', this.state.preebookId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            docId: doc.id,
          });
        });
      });
  };

  getshopDetails = () => {
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
  };

  updateMedicineStatus = (docId) => {
    db.collection('YourPreebook').doc(this.state.docId).update({
      request_status: 'delivered',
    });
  };

  addNotificationUser = () => {
    var message = this.state.storeName + ' has delivered medicine';
    db.collection('all_notifications').add({
      targeted_user_id: this.state.userId,
      shop_id: this.state.shopId,
      preebookId: this.state.preebookId,
      medicinename: this.state.medicinename,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      notification_status: 'unread',
      message: message,
    });
  };

  addNotification = () => {
    console.log('in the function ', this.state.rec);
    var message = this.state.userfullName + ' has recived medicine';
    db.collection('all_notifications').add({
      targeted_user_id: this.state.shopId,
      user_id: this.state.userId,
      preebookId: this.state.preebookId,
      medicinename: this.state.medicinename,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      notification_status: 'unread',
      message: message,
    });
  };

  componentDidMount() {
    this.getdocId();
    this.getuserDetials();
    this.getshopDetails();
    this.getcurrentUserDetails();
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
                  text: 'PreebookDetials',
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
              </Card>
            </View>
            <View style={{ flex: 0.3, marginTop: RFValue(20) }}>
              <Card title={'Booking Information'} titleStyle={{ fontSize: 20 }}>
                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Date : {this.state.date}
                  </Text>
                </Card>
                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Time : {this.state.time}
                  </Text>
                </Card>
              </Card>
            </View>

            <View style={{ flex: 0.3 }}>
              <Card title={'Shop Information'} titleStyle={{ fontSize: 20 }}>
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
                  this.updateMedicineStatus();
                  this.addNotification();
                  this.props.navigation.navigate('YourPreebook');
                }}>
                <Text style={{ color: '#ffff' }}> Resived</Text>
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
                  text: 'Preebook Detials',
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
              </Card>
            </View>
            <View style={{ flex: 0.3, marginTop: RFValue(20) }}>
              <Card title={'Booking Information'} titleStyle={{ fontSize: 20 }}>
                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Date : {this.state.date}
                  </Text>
                </Card>
                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Time : {this.state.time}
                  </Text>
                </Card>
              </Card>
            </View>

            <View style={{ flex: 0.3 }}>
              <Card
                title={'Customer Information'}
                titleStyle={{ fontSize: 20 }}>
                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Name: {this.state.userfullName}
                  </Text>
                </Card>

                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Phone Number: {this.state.usermobile_number}
                  </Text>
                </Card>

                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Address: {this.state.address}
                  </Text>
                </Card>

                <Card>
                  <Text style={{ fontWeight: 'bold' }}>
                    Email: {this.state.userId}
                  </Text>
                </Card>
              </Card>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.updateMedicineStatus();
                  this.addNotificationUser();
                  this.props.navigation.navigate('YourPreebook');
                }}>
                <Text style={{ color: '#ffff' }}> Delivered</Text>
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
