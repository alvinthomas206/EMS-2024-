import React from 'react';
import LottieView from 'lottie-react-native';

export default class Animation extends React.Component {
  render() {
    return (
      <LottieView
      source={require('../assets/animations/Animation.json')}
      style={{width:"90%",marginBottom:5}}
      autoPlay loop />
    )
  }
}
