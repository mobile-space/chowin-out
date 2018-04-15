import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';

export default class IntroSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      isLoading: true,
    }
  }

  componentWillMount() {
    this.navigateToHome();
  }

  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });

        this.setState({ isLoading: false });
        console.log(`isLoading: ${this.state.isLoading}`);
        console.log(`The latitude is ${this.state.latitude}`);
        console.log(`The longitude is ${this.state.longitude}`);

      },
      (error) => this.setState({ 
        error: error.message, 
        isLoading: true
      }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  navigateToHome = () => {
    const { isLoading } = this.state;

    this.getCurrentLocation();
    if(!isLoading){
      this.props.navigation.navigate('HomeTabs');
    }
  }

  loadingView = () => {
    return (
      <View style={styles.loadingView}>
        <View style={styles.activityIndicatorAndButtonContainer}>
        <ActivityIndicator size="large" />
        <View style={styles.buttonContainer}>
          <Button
            raised
            icon={{name: 'my-location'}}
            title='Get Location' 
            onPress={this.navigateToHome}
          />
        </View>
        </View>
      </View>
    )
  }

  render() {
    const { isLoading } = this.state;

    return (
      <View style={ styles.mainContainer }>
        { isLoading ? this.loadingView() : this.props.navigation.navigate('HomeTabs') }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activityIndicatorAndButtoncontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    marginTop: 200,
  },

});