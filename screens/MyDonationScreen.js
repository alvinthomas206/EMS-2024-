import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader.js';
import firebase from 'firebase';
import db from '../config.js';

export default class MyDonationScreen extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: firebase.auth().currentUser.email,
      donorName: '',
      allDonations: [],
    };
    this.exchangeRef = null;
  }

  static navigationOptions = { header: null };

 currentUserDetails = (currentUser) => {
    db.collection('users')
      .where('username', '==', currentUser)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            donorName: doc.data().first_name + ' ' + doc.data().last_name,
          });
        });
      });
  };

  getAllDonations = () => {
    this.exchangeRef = db
      .collection('Medicinerequests')
      .where('donor_id', '==', this.state.currentUser)
      .onSnapshot((snapshot) => {
        var allDonations = [];
        snapshot.docs.map((doc) => {
          var donation = doc.data();
          donation['doc_id'] = doc.id;
          allDonations.push(donation);
        });
        this.setState({
          allDonations: allDonations,
        });
      });
  };

  senditem = (medicineDetails) => {
    if (medicineDetails.medicineStatus === 'Medicine Sent') {
      var medicineStatus = 'Donor Interested';
      db.collection('Medicinerequests').doc(medicineDetails.doc_id).update({
        medicineStatus: 'Donor Interested',
      });
      this.sendNotification(medicineDetails, medicineStatus);
    } else {
      medicineStatus = 'Medicine Sent';
      db.collection('Medicinerequests').doc(medicineDetails.doc_id).update({
        medicineStatus: 'Medicine Sent',
      });
      this.sendNotification(medicineDetails, medicineStatus);
    }
  };

  sendNotification = (medicineDetails, medicineStatus) => {
    var requestId = medicineDetails.requestId;
    var currentUser = medicineDetails.donor_id;
    db.collection('all_notifications')
      .where('requestId', '==', requestId)
      .where('donor_id', '==', currentUser)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var message = '';
          if (medicineStatus === 'Medicine Sent') {
            message = this.state.donorName + ' sent you the Medicine';
          } else {
            message =
              this.state.donorName +
              ' has shown interest in donating the Medicine';
          }

          db.collection('all_notifications').doc(doc.id).update({
            message: message,
            notification_status: 'unread',
            date: firebase.firestore.FieldValue.serverTimestamp(),
          });
        });
      });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => (
    <ListItem
      key={i}
      title={item.medicinename}
      subtitle={
        'Requested  By : ' +
        item.requested_by +
        '\nStatus : ' +
        item.medicineStatus
      }
      leftElement={
        <Image
          source={require('../assets/medicine.png')}
          style={{ width: 50, height: 50 }}
        />
      }
      titleStyle={{ color: 'black', fontWeight: 'bold' }}
      rightElement={
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                item.medicineStatus === 'Medicine Sent' ? "green" : "#ff5722"
            }
          ]}
          onPress={() => {
            this.senditem(item);
          }}>
          <Text style={{ color: '#ffff' }}>
            {item.medicineStatus === 'Medicine Sent'
              ? 'Medicine Sent'
              : 'Send Medicine'}
          </Text>
        </TouchableOpacity>
      }
      bottomDivider
    />
  );

  componentDidMount() {
    this.currentUserDetails(this.state.currentUser);
    this.getAllDonations();
  }

  componentWillUnmount() {
    this.exchangeRef();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      <MyHeader title="My Donation" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          {this.state.allDonations.length === 0 ? (
            <View style={styles.subtitle}>
              <Text style={{ fontSize: 20 }}>List of all Donations</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allDonations}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
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
    elevation: 16,
  },
  subtitle: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
