import React from 'react';
import { Image } from 'react-native';
import {ViewPropTypes, Text} from 'deprecated-react-native-prop-types';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator'
import RequestMedicine from '../screens/RequestMedicine';

import UpdateMedicine from '../screens/UpdateMedicines'
import AddMedicines from '../screens/AddMedicines';


export const AppTabNavigator2 = createBottomTabNavigator({
 
  UpdateMedicine : {
    screen: UpdateMedicine,
    navigationOptions :{
      tabBarIcon :   <Image source={require("../assets/home.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Update Medicine",
      
    }
  },
  AddMedicines: {
    screen: AddMedicines,
    navigationOptions :{
      tabBarIcon :<Image source={require("../assets/ads-icon.png")} style={{width:20, height:20,}} />,
      tabBarLabel : "Add Medicines",
    }
  }
});


export const AppTabNavigator = createBottomTabNavigator({
  HomeScreen : {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarIcon :   <Image source={require("../assets/home.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "HomeScreen",
      
    }
  },
  BookRequest: {
    screen: RequestMedicine,
    navigationOptions :{
      tabBarIcon :<Image source={require("../assets/ads-icon.png")} style={{width:20, height:20,}} />,
      tabBarLabel : "RequestMedicine",
    }
  }
});
