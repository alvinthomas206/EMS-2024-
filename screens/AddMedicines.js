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

export default class AddMedicines extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: firebase.auth().currentUser.email,
      medicineName: '',
      description: '',
      nickName: '',
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addMedicine = (medicineName, description) => {
    var currentUser = this.state.currentUser;
    var nickName = this.state.nickName;
    var storeName =this.state.storeName;
    var medicineValue =this.state.medicineValue;
    var medicineId = this.createUniqueId();
    db.collection('medicine').add({
      "medicine_status": 'Yes',
      "shopId": currentUser,
      "medicinename": medicineName,
      "storeName":storeName,
      "description": description,
      "nickName": nickName,
      "medicineId": medicineId,
      "medicine_value": medicineValue,
      "date": firebase.firestore.FieldValue.serverTimestamp(),
    });
    this.setState({
      medicineName: '',
      description: '',
      nickName: '',
      medicineValue:'',
    });

    return Alert.alert('Medicine Added ', '', [
      {
        text: 'OK',
        onPress: () => {
          this.props.navigation.navigate('UpdateMedicines');
        },
      },
    ]);
  };

  getShopDetails = (currentUser) => {
    db.collection('users')
      .where('username', '==', currentUser)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            userType: doc.data().userType,
            storeName:doc.data().storeName,
          });
        });
      });
  };

  componentDidMount() {
    this.getShopDetails(this.state.currentUser);
  
  }
  render() {
    if (this.state.userType === 'user') {
      return (
        <View style={{ flex: 1 }}>
          <MyHeader navigation={this.props.navigation} title="Add Medicine" />
          <View style={styles.subtitle}>
            <Text style={{ fontSize: 20 }}>You are not a shop owner</Text>
          </View>
        </View>
      );
    }
     else {
      return (
        <View style={{ flex: 1 }}>
          <MyHeader title="Add Medicine" navigation={this.props.navigation} />
          <KeyboardAvoidingView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
              style={styles.formTextInput}
              placeholder={'Medicine Name'}
                            onChangeText={(text) => {
                this.setState({
                  medicineName: text,
                });
              }}
              value={this.state.medicineName}
            />
            <TextInput
              style={[styles.formTextInput, { height: 100 }]}
              multiline
              numberOfLines={4}
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
              placeholder={'Nick Name of medicine'}
              onChangeText={(text) => {
                this.setState({
                  nickName: text,
                });
              }}
              value={this.state.nickName}
            />
            <TextInput
              style={styles.formTextInput}
              keyboardType={'numeric'}
              placeholder={'Medicine Price'}
              maxLength={8}
              onChangeText={(text) => {
                this.setState({
                  medicineValue: text,
                });
              }}
              value={this.state.medicineValue}
            />

            <TouchableOpacity
              style={[styles.button, { marginTop: 10 }]}
              onPress={() => {
                this.addMedicine(this.state.medicineName, this.state.description,this.state.medicineValue);
              }}>
              <Text
                style={{ color: '#ffff', fontSize: 18, fontWeight: 'bold' }}>
                Add Medicine
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      );
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
    subtitle: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
});
