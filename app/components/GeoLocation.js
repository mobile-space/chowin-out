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
      isLoading: false,
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
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
        console.log(`The latitude is ${this.state.latitude}`);
        console.log(`The longitude is ${this.state.longitude}`);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
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
            onPress={this.getCurrentLocation}
          />
        </View>
        </View>
      </View>
    )
  }

  contentView = () => {
    <Text>This is GeoLocation </Text>
  }


  render() {
    const { isLoading } = this.state;

    return (
      <View style={ styles.mainContainer }>
        { isLoading ? this.loadingView() : this.contentView() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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