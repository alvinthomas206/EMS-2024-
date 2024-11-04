import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Animation from '../components/Animation.js';
import { RFValue } from 'react-native-responsive-fontsize';

import db from '../config';
import firebase from 'firebase';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      
      firstName: '',
      lastName: '',
      mobileNumber: '',
      address: '',
      confirmPassword: '',
    };
  }

  userLogin = (username, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        this.props.navigation.navigate('MedicalShop');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  render() {
    return (
      <View style={styles.container}>
     
        <View style={styles.profileContainer}>
   
          <Animation />

          <Text style={styles.title}>Login</Text>
        </View>  

        <View style={styles.buttonContainer}>
          <Text
            style={{
              color: '#EEEEEE',
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: 55,
            }}>
            USERNAME
          </Text>
          <View style={{ alignItems: 'center' }}>
            <TextInput
              style={styles.loginBox}
              keyboardType={'email-address'}
              onChangeText={(text) => {
                this.setState({
                  username: text,
                });
              }}
            />
          </View>
          <Text
            style={{
              color: '#EEEEEE',
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: 55,
            }}>
            PASSWORD
          </Text>
          <View style={{ alignItems: 'center' }}>
            <TextInput
              style={styles.loginBox}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              style={[styles.button, { marginBottom: 10 }]}
              onPress={() => {
                this.userLogin(this.state.username, this.state.password);
              }}>
              <Text
                style={{ color: '#32867d', fontSize: 18, fontWeight: 'bold' }}>
                LOGIN
              </Text>
            </TouchableOpacity>
           
          </View>
            </View>
        </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1200F4',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: '300',
    fontFamily: 'AvenirNext-Heavy',
    color: '#EEEEEE',
    marginTop: -70,
  },
  loginBox: {
    width: 300,
    height: 35,
    borderBottomWidth: 1.5,
    borderColor: '#32867d',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 5,
  },
  button: {
    width: '75%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#ffff',
    elevation: 10,
  },
  buttonContainer: {
    marginTop:50,
    flex: 1,
  },
 
});
