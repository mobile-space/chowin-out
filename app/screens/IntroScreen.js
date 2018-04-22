import { Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Alert, StatusBar, AsyncStorage } from 'react-native';
import React from 'react';
import OnBoard from '../components/OnBoard'
import FoodChooseScreen from '../screens/FoodChooseScreen'

import HomeTabs from '../navigation/HomeTabs'

import checkIfFirstLaunch from '../utils/checkIfFirstLaunch';

export default class IntroScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      isFirstLaunch: false,
      hasCheckedAsyncStorage: false,
    };
  }

  async componentWillMount() {
    const isFirstLaunch = await checkIfFirstLaunch();
    this.setState({ isFirstLaunch, hasCheckedAsyncStorage: true });
  }

  
  render() {
    const { hasCheckedAsyncStorage, isFirstLaunch } = this.state;
    console.log(isFirstLaunch + "first launch")


    if (!hasCheckedAsyncStorage) {
      return null;
    }

    return isFirstLaunch ?
    <OnBoard navigation={this.props.navigation}/> :
    <HomeTabs/>;
  
  }
}

