import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import MyHeader from '../components/MyHeader';

import db from '../config';

export default class MedicalShop extends Component {
  constructor() {
    super();
    this.state = {
      allMedicine: [],
      dataSource: [],
      allRequests: [],
      search: '',
    };
    this.requestRef = null;
  }

  getAllRequests = () => {
    this.requestRef = db
      .collection('medicine')
      .where('medicine_status', '==', 'Yes')
      .onSnapshot((snapshot) => {
        var allRequests = [];
        snapshot.forEach((doc) => {
          allRequests.push(doc.data());
        });
        this.setState({ allRequests: allRequests });
      });
  };

  SearchFilterFunction(text) {
    const newData = this.state.allRequests.filter((item) => {
      const itemData = item.medicinename
        ? item.medicinename.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i, data }) => {
    return (
      <ListItem
        key={i}
        title={item.medicinename}
        subtitle={item.storeName}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('ShopDetials', { details: item });
            }}>
            <Text style={{ color: '#ffff' }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };

  componentDidMount() {
    this.getAllRequests();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Medicine Search" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          <SearchBar
            placeholder="Type Here to Search..."
            onChangeText={(text) => this.SearchFilterFunction(text)}
            onClear={(text) => this.SearchFilterFunction('')}
            value={this.state.search}
          />
          {this.state.allRequests.length === 0 ? (
            <View
              style={{
                flex: 1,
                fontSize: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 20 }}>List of all Medicine</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={
                this.state.search === ''
                  ? this.state.allRequests
                  : this.state.dataSource
              }
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
  },
});
