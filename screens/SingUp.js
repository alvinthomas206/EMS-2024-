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

export default class SingUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: 'Not Given Yet',
      lastName: 'Not Given Yet',
      username: 'Not Given Yet',
      password: 'Not Given Yet',
      confirmPassword: 'Not Given Yet',
      ownerName: 'Not Given Yet',
      storeName: 'Not Given Yet',
      mobileNumber: 'Not Given Yet',
      shopPhoneNumber: 'Not Given Yet',
      address: 'Not Given Yet',
      upi: 'Not Given Yet',
      map: 'Not Given Yet',

      isVisibleOwner: false,
      isVisibleUser: false,
    };
  }

  userSignUp = (username, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("password doesn't match\nCheck your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(username, password)
        .then((response) => {
          db.collection('users').add({
            userType: 'user',
            IsExchangeRequestActive: false,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            mobile_number: this.state.mobileNumber,
            username: this.state.username,
            address: this.state.address,
          });
          return Alert.alert('User Added Successfully', '', [
            {
              text: 'OK',
              onPress: () => {
                this.props.navigation.navigate('Login'),
                  this.setState({ isVisibleUser: false });
              },
            },
          ]);
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };

  ownerSignUp = (username, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("password doesn't match\nCheck your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(username, password)
        .then((response) => {
          db.collection('users').add({
            userType: 'Owner',
            username: this.state.username,
            ownerName: this.state.ownerName,
            storeName: this.state.storeName,
            mobile_number: this.state.mobileNumber,
            shopPhoneNumber: this.state.shopPhoneNumber,
            address: this.state.address,
            upi: this.state.upi,
            map: this.state.map,
          });
          return Alert.alert('User Added Successfully', '', [
            {
              text: 'OK',
              onPress: () => {
                this.props.navigation.navigate('Login'),
                  this.setState({ isVisibleOwner: false });
              },
            },
          ]);
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };

  showModalUser = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isVisibleUser}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView style={{ width: '100%' }}>
          <View
            style={{
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: RFValue(30),
                fontWeight: 'bold',
                color: '#1200F4',
                marginTop: 15,
                marginBottom: 15,
              }}>
              {' '}
              User Sing Up{' '}
            </Text>
          </View>
          <View style={{ flex: 0.95 }}>
            <TextInput
              style={styles.formTextInput}
              placeholder={'First Name'}
              maxLength={8}
              onChangeText={(text) => {
                this.setState({
                  firstName: text,
                });
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Last Name'}
              maxLength={8}
              onChangeText={(text) => {
                this.setState({
                  lastName: text,
                });
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Mobile Number'}
              maxLength={10}
              keyboardType={'numeric'}
              onChangeText={(text) => {
                this.setState({
                  mobileNumber: text,
                });
              }}
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
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Username'}
              keyboardType={'email-address'}
              onChangeText={(text) => {
                this.setState({
                  username: text,
                });
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Password'}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Confrim Password'}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  confirmPassword: text,
                });
              }}
            />
          </View>
          <View style={{ flex: 0.2, alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() =>
                this.userSignUp(
                  this.state.username,
                  this.state.password,
                  this.state.confirmPassword
                )
              }>
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => this.setState({ isVisibleUser: false })}>
              <Text
                style={{
                  fontSize: RFValue(20),
                  fontWeight: 'bold',
                  color: '#1200F4',
                  marginTop: RFValue(10),
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  showModalOwner = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isVisibleOwner}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <KeyboardAvoidingView>
          <ScrollView style={{ width: '100%' }}>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFValue(30),
                  fontWeight: 'bold',
                  color: '#1200F4',
                  marginTop: 15,
                  marginBottom: 15,
                }}>
                {' '}
                Shop Owner Sing Up{' '}
              </Text>
            </View>
            <View style={{ flex: 0.95 }}>
              <TextInput
                style={styles.formTextInput}
                placeholder={'Owner Name'}
                onChangeText={(text) => {
                  this.setState({
                    ownerName: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Store Name'}
                onChangeText={(text) => {
                  this.setState({
                    storeName: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Mobile Number'}
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  this.setState({
                    mobileNumber: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Shop Phone Number'}
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  this.setState({
                    shopPhoneNumber: text,
                  });
                }}
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
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={'Google Map Link'}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({
                    map: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Upi Link (Google Pay, Paytm ect)'}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({
                    upi: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Email Address'}
                keyboardType={'email-address'}
                onChangeText={(text) => {
                  this.setState({
                    username: text,
                  });
                }}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={'Password'}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Confrim Password'}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    confirmPassword: text,
                  });
                }}
              />
            </View>
            <View style={{ flex: 0.2, alignItems: 'center' }}>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() =>
                  this.ownerSignUp(
                    this.state.username,
                    this.state.password,
                    this.state.confirmPassword
                  )
                }>
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => this.setState({ isVisibleOwner: false })}>
                <Text
                  style={{
                    fontSize: RFValue(20),
                    fontWeight: 'bold',
                    color: '#1200F4',
                    marginTop: RFValue(10),
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {this.showModalOwner()}
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {this.showModalUser()}
        </View>

        <ScrollView>
          <KeyboardAvoidingView>
            <View style={styles.profileContainer}>
              <Animation />
              <View style={{ marginTop: 30 }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.setState({ isVisibleUser: true });
                  }}>
                  <Text
                    style={{
                      color: '#32867d',
                      fontSize: 25,
                      fontWeight: 'bold',
                    }}>
                    User Sing Up
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.setState({ isVisibleOwner: true });
                  }}>
                  <Text
                    style={{
                      color: '#32867d',
                      fontSize: 25,
                      fontWeight: 'bold',
                    }}>
                    Shop Owner Sing Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
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
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    marginTop: 50,
    width: 300,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#ffff',
    elevation: 10,
  },

  formTextInput: {
    width: '90%',
    height: RFValue(45),
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'grey',
    paddingBottom: RFValue(10),
    marginLeft: RFValue(20),
    marginBottom: RFValue(14),
  },
  registerButton: {
    width: '85%',
    height: RFValue(50),
    marginTop: RFValue(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(3),
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
  registerButtonText: {
    fontSize: RFValue(23),
    fontWeight: 'bold',
    color: '#fff',
  },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 30,
  },
});
