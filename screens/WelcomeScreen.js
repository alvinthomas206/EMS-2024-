import React, { Component } from 'react';
import { getDatabase, ref, onValue } from 'firebase';
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

export default class WelcomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Animation />
          <Text style={styles.title}>EMS App</Text>
          <Text style={styles.subtitle}>Emergency Medicine Search App</Text>
        </View>

        <View style={{ alignItems: 'center', flex: 1, marginTop: 50 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}>
            <Text
              style={{ color: '#32867d', fontSize: 23, fontWeight: 'bold' }}>
               Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('SingUp');
            }}>
            <Text
              style={{ color: '#32867d', fontSize: 23, fontWeight: 'bold' }}>
              Sing Up
            </Text>
          </TouchableOpacity>
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
    marginBottom: 30,
  },
  subtitle: {
    marginTop:-10,
    fontSize: 20,
    fontWeight: '300',
    fontFamily: 'AvenirNext-Heavy',
    color: '#ffffff',
    marginBottom: 30,
  },

  button: {
    marginTop: 20,
    width: '75%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#ffff',
    elevation: 20,
  },
});
