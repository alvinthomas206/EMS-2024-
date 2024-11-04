import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class RequestMedicine extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: firebase.auth().currentUser.email,
      medicinename: '',
      description: '',
      requestedItemName: '',
      requestId: '',
      medicineStatus: '',
      userDocId: '',
      docId: '',
      medicineValue: '',
      currencyCode: '',
      ableToPay: '',
      userType: '',
      fullName: '',
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addItem = async (medicinename, description, ableToPay) => {
    var userName = this.state.currentUser;
    var requestId = this.createUniqueId();
    db.collection('Medicinerequests').add({
      username: userName,
      resived: 'no',
      medicinename: medicinename,
      description: description,
      requestId: requestId,
      abletopay: ableToPay,
      medicineStatus: 'requested',
      medicineValue: this.state.medicineValue,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });

    await this.getMedicineRequest();
    db.collection('users')
      .where('username', '==', userName)
      .get()
      .then()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection('users').doc(doc.id).update({
            IsMedicineRequestActive: true,
          });
        });
      });

    this.setState({
      itemName: '',
      description: '',
      medicineValue: '',
      ableToPay: '',
    });

    return Alert.alert('Medicine Added', '', [
      {
        text: 'OK',
        onPress: () => {
          this.props.navigation.navigate('HomeScreen');
        },
      },
    ]);
  };
  



  getIsMedicineRequestActive() {
    db.collection('users')
      .where('username', '==', this.state.currentUser)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            IsMedicineRequestActive: doc.data().IsMedicineRequestActive,
            userDocId: doc.id,
            userType: doc.data().userType,
          });
        });
      });
  }

  getMedicineRequest = () => {
    var exchangeRequest = db
      .collection('Medicinerequests')
      .where('username', '==', this.state.currentUser)
      .where('resived', '==', "no")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            requestedDonorId: doc.data().donor_id,
            requestedrequestId: doc.data().requestId,
            requestedmedicinename: doc.data().medicinename,
            requestedmedicineStatus: doc.data().medicineStatus,
            requestedmedicineValue: doc.data().medicineValue,
            docId: doc.id,
          });
        });
      });
  };

  componentDidMount() {
    this.getMedicineRequest();
    this.getIsMedicineRequestActive();
  }

  receivedItem = () => {
    db.collection('Received_Medicines').add({
      user_id: this.state.currentUser,
      medicinename: this.state.requestedmedicinename,
      requestId: this.state.requestedrequestId,
      medicineStatus: 'received',
      donorId: this.state.requestedDonorId,
    });
  };

  updateExchangeRequestStatus = () => {
    db.collection('Medicinerequests').doc(this.state.docId).update({
      medicineStatus: 'recieved',
      resived: 'yes',
    });
    db.collection('users')
      .where('username', '==', this.state.currentUser)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection('users').doc(doc.id).update({
            IsMedicineRequestActive: false,
          });
        });
      });
  };

  sendNotification = () => {
    db.collection('users')
      .where('username', '==', this.state.currentUser)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            fullName: doc.data().first_name 
          });
        });
      });

    db.collection('all_notifications').add({
      targeted_user_id: this.state.requestedDonorId,
      message:
        this.state.fullName +
        ' received the Medicine ' +
        this.state.requestedmedicinename,
        notification_status: 'unread',
        requestId:this.state.requestedrequestId,
    });
  };

  render() {
    if (this.state.IsMedicineRequestActive === true) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View
            style={{
              borderColor: '#1200F4',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              margin: 10,
            }}>
            <Text>Medicine Name</Text>
            <Text>{this.state.requestedmedicinename}</Text>
          </View>
          <View
            style={{
              borderColor: '#1200F4',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              margin: 10,
            }}>
            <Text> Medicine Value </Text>

            <Text>{this.state.requestedmedicineValue}</Text>
          </View>
          <View
            style={{
              borderColor: '#1200F4',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              margin: 10,
            }}>
            <Text> Medicine Status </Text>

            <Text>{this.state.requestedmedicineStatus}</Text>
          </View>

          <TouchableOpacity
            style={{
              borderColor: '#1200F4',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              margin: 10,
              backgroundColor: '#1200F4',
              height: 70,
              borderRadius: 25,
            }}
            onPress={() => {
          //    this.sendNotification();
              this.updateExchangeRequestStatus();
         //     this.receivedItem();
            }}>
            <Text style={{ color: 'white', fontSize: 20 }}>
              I recieved the Medicine{' '}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      if (this.state.userType === 'user')
        return (
          <View style={{ flex: 1 }}>
            <MyHeader
              title="Request Medicine"
              navigation={this.props.navigation}
            />
            <KeyboardAvoidingView
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                style={styles.formTextInput}
                placeholder={'Medicine Name'}
                onChangeText={(text) => {
                  this.setState({
                    medicinename: text,
                  });
                }}
                value={this.state.medicinename}
              />
              <TextInput
                multiline
                numberOfLines={4}
                style={[styles.formTextInput, { height: 100 }]}
                placeholder={'Description'}
                onChangeText={(text) => {
                  this.setState({
                    description: text,
                  });
                }}
                value={this.state.description}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Item Value'}
                keyboardType={'numeric'}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({
                    medicineValue: text,
                  });
                }}
                value={this.state.medicineValue}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={'Are you able to pay  Yes or No'}
                maxLength={3}
                onChangeText={(text) => {
                  this.setState({
                    ableToPay: text,
                  });
                }}
                value={this.state.ableToPay}
              />
              <TouchableOpacity
                style={[styles.button, { marginTop: 10 }]}
                onPress={() => {
                  this.addItem(
                    this.state.medicinename,
                    this.state.description,
                    this.state.ableToPay,
                    this.state.medicineValue
                  );
                }}>
                <Text
                  style={{ color: '#ffff', fontSize: 18, fontWeight: 'bold' }}>
                  Add Medicine
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        );
      else {
        return (
          <View style={{ flex: 1 }}>
            <MyHeader
              navigation={this.props.navigation}
              title="Request Medicine"
            />
            <View style={styles.subtitle}>
              <Text style={{ fontSize: 20 }}>
                Shop owner cannot Request Medicine{' '}
              </Text>
            </View>
          </View>
        );
      }
    }
  }
}
const styles = StyleSheet.create({
  formTextInput: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#1200F4',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: '75%',
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
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  subtitle: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
