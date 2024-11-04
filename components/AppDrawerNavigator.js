import React from 'react';
import {ViewPropTypes, Text} from 'deprecated-react-native-prop-types';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator';
import { AppTabNavigator2 } from './AppTabNavigator';
import CustomSidebarMenu from './CustomSidebarMenu';
import MyDonationScreen from '../screens/MyDonationScreen';
import SettingScreen from '../screens/SettingScreen';
import NotificationScreen from '../screens/NotificationsScreen';
import MedicalShop from '../screens/MedicalShop';
import Preebook from '../screens/YourPreebook';
import Purchase from '../screens/Purchase';
import { Icon, Image } from 'react-native-elements';
import { AppStackNavigator2 } from './AppStackNavigator';
import { AppStackNavigator3 } from './AppStackNavigator';
import { AppStackNavigator4 } from './AppStackNavigator';

export const AppDrawerNavigator = createDrawerNavigator(
  {
    MedicalShop: {
      screen: AppStackNavigator2,
      navigationOptions: {
        drawerIcon: (
          <Image
            source={require('../assets/home.png')}
            style={{ width: 30, height: 30 }}
          />
        ),
      },
    },

    Donate: {
      screen: AppTabNavigator,
      navigationOptions: {
        drawerIcon: (
          <Image
            source={require('../assets/hand.png')}
            style={{ width: 30, height: 30 }}
          />
        ),
      },
    },

    MyDonation: {
      screen: MyDonationScreen,
      navigationOptions: {
        drawerIcon: (
          <Image
            source={require('../assets/capsules.png')}
            style={{ width: 30, height: 30 }}
          />
        ),
      },
    },

    Notifications: {
      screen: NotificationScreen,
      navigationOptions: {
        drawerIcon: <Icon name="bell" type="font-awesome" />,
        drawerLabel: 'Notifications',
      },
    },

    MyPreebooks: {
      screen: AppStackNavigator3,
      navigationOptions: {
        drawerIcon: (
          <Image
            source={require('../assets/medicine1.png')}
            style={{ width: 30, height: 30 }}
          />
        ),
        drawerLabel: ' Preebooks',
      },
    },

    Purchase: {
      screen: AppStackNavigator4,
      navigationOptions: {
        drawerIcon: (
          <Image
            source={require('../assets/medicine2.png')}
            style={{ width: 30, height: 30 }}
          />
        ),
        drawerLabel: ' Purchase',
      },
    },

    ShopOwner: {
      screen: AppTabNavigator2,
      navigationOptions: {
        drawerIcon: (
          <Image
            source={require('../assets/medicine3.png')}
            style={{ width: 30, height: 30 }}
          />
        ),
        drawerLabel: ' Shop Owner',
      },
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        drawerIcon: <Icon name="settings" type="fontawesome5" />,
        drawerLabel: 'Setting',
      },
    },
  },
  {
    contentComponent: CustomSidebarMenu,
  },
  {
    initialRouteName: 'MedicalShop',
  }
);
