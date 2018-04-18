import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default class FetchRestaurants extends Component {

  constructor() {
    super()
    this.state = {
      API_URL: 'https://api.eatstreet.com',
      RES_SEARCH_URL: '/publicapi/v1/restaurant/search',
      API_KEY: 'ba2d3e545f0d2bd1',
      method: 'both',
      search: 'vegan',
      latitude: '37.785834',
      longitude: '-122.406417',
      streetAddress: 'san francisco',
      pickupRadius: '5'
    }
  }

  async _fetchRestaurants() {
    const { API_KEY, RES_SEARCH_URL, API_URL, method, search, streetAddress, longitude, latitude, pickupRadius } = this.state

    this.setState({ isLoading: true })
    try {
      const response = await fetch(`${API_URL}${RES_SEARCH_URL}?method=${method}&search=${search}&longitude=${longitude}&latitude=${latitude}&pickup-radius=${pickupRadius}`, 
      {
        method: 'GET',
        headers: {'X-Access-Token': `${API_KEY}`, }
      });
      const responseJSON = await response.json();
      if (response.status === 200) {
        const { restaurants } = responseJSON
        console.log("Restaurants length:", restaurants.length)
        console.log("Restaurants", restaurants)

        // console.log(responseJSON)
      } else {
        const error = responseJSON.details
        // console.log("Server request failed " + error);
      }
    } catch (error) {
      console.log("Server is down " + error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title='SEARCH'
          buttonStyle={{
            paddingHorizontal: 5
          }}
          onPress={() => this._fetchRestaurants()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


