import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {ViewPropTypes, Text} from 'deprecated-react-native-prop-types';
import WelcomeScreen from './screens/WelcomeScreen';
import { AppDrawerNavigator } from './components/AppDrawerNavigator';
import { AppTabNavigator } from './components/AppTabNavigator';
import SingUp from './screens/SingUp';
import Login from './screens/Login';
import YourPreebook from './screens/YourPreebook';
import PreebookDetials from './screens/PreebookDetials';
import ReceiverDetailsScreen from './screens/ReceiverDetailsScreen';
import PurchaseDetials from './screens/PurchaseDetials';
import Purchase from './screens/Purchase';
import MyDonationScreen from './screens/MyDonationScreen';
import UpdateMedicines from './screens/UpdateMedicines';

export default function App() {
  return <AppContainer />;
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  SingUp: { screen: SingUp },
  Login: { screen: Login },
  MyDonationScreen: { screen: MyDonationScreen },
  YourPreebook: { screen: YourPreebook },
  Purchase: { screen: Purchase },
  PreebookDetials: { screen: PreebookDetials },
  PurchaseDetials: { screen: PurchaseDetials },
  UpdateMedicines: { screen: UpdateMedicines },
  ReceiverDetailsScreen: { screen: ReceiverDetailsScreen },
  Drawer: { screen: AppDrawerNavigator },
  BottomTab: { screen: AppTabNavigator },
});

const AppContainer = createAppContainer(switchNavigator);
