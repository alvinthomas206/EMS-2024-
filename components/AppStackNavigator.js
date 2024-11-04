import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import DonateScreen from '../screens/DonateScreen';
import ReceiverDetailsScreen from '../screens/ReceiverDetailsScreen';
import NotificationScreen from '../screens/NotificationsScreen';
import {ViewPropTypes, Text} from 'deprecated-react-native-prop-types';
import MedicalShop from '../screens/MedicalShop';
import ShopDetials from '../screens/ShopDetials';

import PreebookDetials from '../screens/PreebookDetials';
import YourPreebook from '../screens/YourPreebook';

import Purchase from '../screens/Purchase';
import PurchaseDetials from '../screens/PurchaseDetials';

export const AppStackNavigator4 = createStackNavigator(
  {
    Purchase: {
      screen: Purchase,
      navigationOptions: {
        headerShown: false,
      },
    },

    PurchaseDetials: {
      screen: PurchaseDetials,
      navigationOptions: {
        headerShown: false,
      },
    },
    Notification: {
      screen: NotificationScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },

  {
    initialRouteName: 'Purchase',
  }
);

export const AppStackNavigator3 = createStackNavigator(
  {
    YourPreebook: {
      screen: YourPreebook,
      navigationOptions: {
        headerShown: false,
      },
    },
    PreebookDetials: {
      screen: PreebookDetials,
      navigationOptions: {
        headerShown: false,
      },
    },

    Notification: {
      screen: NotificationScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },

  {
    initialRouteName: 'YourPreebook',
  }
);

export const AppStackNavigator2 = createStackNavigator(
  {
    MedicalShop: {
      screen: MedicalShop,
      navigationOptions: {
        headerShown: false,
      },
    },

    ShopDetials: {
      screen: ShopDetials,
      navigationOptions: {
        headerShown: false,
      },
    },
    Notification: {
      screen: NotificationScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },

  {
    initialRouteName: 'MedicalShop',
  }
);

export const AppStackNavigator = createStackNavigator(
  {
    DonateScreen: {
      screen: DonateScreen,
      navigationOptions: {
        headerShown: false,
      },
    },

    ReceiverDetails: {
      screen: ReceiverDetailsScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Notification: {
      screen: NotificationScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },

  {
    initialRouteName: 'DonateScreen',
  }
);
