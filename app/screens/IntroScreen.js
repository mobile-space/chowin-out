import { Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Alert, StatusBar } from 'react-native';
import React from 'react';
import OnBoard from '../components/OnBoard'

export default class IntroScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <OnBoard navigation={this.props.navigation}/>
    );
  }
}

