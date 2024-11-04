import React, { Component } from 'react';
import {
  View,
  Alert,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';

export default class SettingScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      userfirstName: '',
      userlastName: '',
      address: '',
      contact: '',
      docId: '',
      userType: '',
      map: '',
      ownerName: '',
      shopPhoneNumber: '',
      storeName: '',
      upi: '',
    };
  }

  getData() {
    var user = firebase.auth().currentUser;
    var email = user.email;

    db.collection('users')
      .where('username', '==', email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            docId: doc.id,
            userType: data.userType,
            userfirstName: data.first_name,
            userlastName: data.last_name,
            emailId: data.username,
            address: data.address,
            contact: data.mobile_number,
            map: data.map,
            ownerName: data.ownerName,
            shopPhoneNumber: data.shopPhoneNumber,
            storeName: data.storeName,
            upi: data.upi,
          });
        });
      });
  }
  updateOwnerData() {
    db.collection('users').doc(this.state.docId).update({
      storeName: this.state.storeName,
      ownerName: this.state.ownerName,
      address: this.state.address,
      mobile_number: this.state.contact,
      shopPhoneNumber: this.state.shopPhoneNumber,
      upi: this.state.upi,
      map: this.state.map,
    });
           return Alert.alert(
          'Updated Successfully',
          '',
          [
            {text: 'OK', onPress: () => {

              this.props.navigation.navigate('SettingScreen')
            }}
          ]
      );
    
  }

  updateData() {
    console.log(this.state.docId);
    db.collection('users').doc(this.state.docId).update({
      first_name: this.state.userfirstName,
      last_name: this.state.userlastName,
      address: this.state.address,
      contact: this.state.contact,
    });

           return Alert.alert(
          'Updated Successfully',
          '',
          [
            {text: 'OK', onPress: () => {

              this.props.navigation.navigate('SettingScreen')
            }}
          ]
      );
    
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    if (this.state.userType === 'user') {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <MyHeader title="Settings" navigation={this.props.navigation} />
          <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
            <TextInput
              style={styles.formTextInput}
              placeholder={'First Name'}
               onChangeText={(text) => {
                this.setState({
                  userfirstName: text,
                });
              }}
              value={this.state.userfirstName}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Last Name'}
               onChangeText={(text) => {
                this.setState({
                  userlastName: text,
                });
              }}
              value={this.state.userlastName}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Contact'}
              maxLength={10}
              keyboardType={'numeric'}
              onChangeText={(text) => {
                this.setState({
                 contact: text,
                });
              }}
              value={this.state.contact}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Address'}
              multiline={true}
              onChangeText={(text) => {
                this.setState({
                  address: text,
                });
              }}
              value={this.state.address}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.updateData();
              }}>
              <Text> Save </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <MyHeader title="Settings" navigation={this.props.navigation} />
          <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
            <TextInput
              style={styles.formTextInput}
              placeholder={'Shop Name'}
                onChangeText={(text) => {
                this.setState({
                  storeName: text,
                });
              }}
              value={this.state.storeName}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'OwnerName'}
              maxLength={8}
              onChangeText={(text) => {
                this.setState({
                  ownerName: text,
                });
              }}
              value={this.state.ownerName}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Contact'}
              maxLength={10}
              keyboardType={'numeric'}
              onChangeText={(text) => {
                this.setState({
                  contact: text,
                });
              }}
              value={this.state.contact}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Shop Phone'}
              maxLength={10}
              keyboardType={'numeric'}
              onChangeText={(text) => {
                this.setState({
                  shopPhoneNumber: text,
                });
              }}
              value={this.state.shopPhoneNumber}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Address'}
              multiline={true}
              onChangeText={(text) => {
                this.setState({
                  address: text,
                });
              }}
              value={this.state.address}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Map'}
              multiline={true}
              onChangeText={(text) => {
                this.setState({
                  map: text,
                });
              }}
              value={this.state.map}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Upi'}
              multiline={true}
              onChangeText={(text) => {
                this.setState({
                  upi: text,
                });
              }}
              value={this.state.upi}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.updateOwnerData();
              }}>
              <Text> Save </Text>
            </TouchableOpacity>
          </View>
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
    borderColor: '#ffab91',
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
    marginTop: 20,
  },
});
