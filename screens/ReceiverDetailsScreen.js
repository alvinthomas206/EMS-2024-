import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import db from '../config.js';

export default class ReceiverDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: firebase.auth().currentUser.email,
      userName: '',
      receiverId: this.props.navigation.getParam('details')['username'],
      abletoPay: this.props.navigation.getParam('details')['abletopay'],
      medicineValue: this.props.navigation.getParam('details')['medicineValue'],
      requestId: this.props.navigation.getParam('details')['requestId'],
      medicinename: this.props.navigation.getParam('details')['medicinename'],
      description: this.props.navigation.getParam('details')['description'],
      receiverName: '',
      receiverContact: '',
      receiverAddress: '',
      receiverRequestDocId: '',
      docId: '',
    };
  }

  getUserDetails = () => {
    db.collection('users')
      .where('username', '==', this.state.currentUser)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data().first_name);
          this.setState({
            userName: doc.data().first_name + ' ' + doc.data().last_name,
          });
        });
      });
  };

  getreceiverDetails() {
    db.collection('users')
      .where('username', '==', this.state.receiverId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            receiverName: doc.data().first_name,
            receiverContact: doc.data().mobile_number,
            receiverAddress: doc.data().address,
          });
        });
      });
  }

  getDocId = () => {
    db.collection('Medicinerequests')
      .where('requestId', '==', this.state.requestId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            docId: doc.id,
          });
        });
      });
  };
  updateMedicineStatus = () => {
    db.collection('Medicinerequests').doc(this.state.docId).update({
      donor_id: this.state.currentUser,
      requested_by: this.state.receiverName,
      medicineStatus: 'Donor Interested',
    });
  };

  addNotification = () => {
    var message =
      this.state.userName + ' has shown interest to give the medicine';
    db.collection('all_notifications').add({
      targeted_user_id: this.state.receiverId,
      donor_id: this.state.currentUser,
      requestId: this.state.requestId,
      medicinename: this.state.medicinename,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      notification_status: 'unread',
      message: message,
    });
  };

  componentDidMount() {
    this.getDocId();
    this.getreceiverDetails();
    this.getUserDetails(this.state.currentUser);
  }

  render() {
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
                onPress={() => this.props.navigation.navigate('HomeScreen')}
              />
            }
            centerComponent={{
              text: 'Donate Medicine',
              style: { color: '#ffff', fontSize: 20, fontWeight: 'bold' },
            }}
            backgroundColor="#1200F4"
          />
        </View>
        <View style={{ flex: 0.3, marginTop: RFValue(20) }}>
          <Card title={'Medicine Information'} titleStyle={{ fontSize: 20 }}>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Medicine Name : {this.state.medicinename}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Reason : {this.state.description}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Able To Pay : {this.state.abletoPay}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Price : {this.state.medicineValue}
              </Text>
            </Card>
          </Card>
        </View>
        <View style={{ flex: 0.3 }}>
          <Card title={'Receiver Information'} titleStyle={{ fontSize: 20 }}>
         
              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Name: {this.state.receiverName}
                </Text>
              </Card>
              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Contact: {this.state.receiverContact}
                </Text>
              </Card>
              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Address: {this.state.receiverAddress}
                </Text>
              </Card>
          
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {this.state.receiverId !== this.state.currentUser ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate('MyDonationScreen');
                this.updateMedicineStatus();
                this.addNotification();
              }}>
              <Text style={{ color: '#ffff' }}>
                I want to give the Medicine{' '}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
      </View>
    );
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
