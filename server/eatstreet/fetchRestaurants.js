import React, { Component } from 'react';
import MyContext from '../config/context';
import CurrentGeoLocation from '../../app/components/GeoLocation'

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
      pickupRadius: '5',
      restaurantsList: []
    }
  }

  async _fetchRestaurants() {
    const { API_KEY, RES_SEARCH_URL, API_URL, method, search, streetAddress, longitude, latitude, pickupRadius } = this.state

    this.setState({ isLoading: true })
    try {
      const response = await fetch(`${API_URL}${RES_SEARCH_URL}?method=${method}&search=${search}&longitude=${longitude}&latitude=${latitude}&pickup-radius=${pickupRadius}`, {
        method: 'GET',
        headers: {
          'X-Access-Token': `${API_KEY}`,
        }
      });
      const responseJSON = await response.json();
      if (response.status === 200) {
        const { restaurants } = responseJSON
        this.setState({ restaurantsList: restaurants })

        // console.log(responseJSON)
      } else {
        const error = responseJSON.details
        // console.log("Server request failed " + error);
      }
    } catch (error) {
      console.log("Server is down " + error);
    }
  }

  componentDidMount() {
    this._fetchRestaurants()
  }

  render() {
    return (
      <MyContext.Provider value={{ restaurantsList: this.state.restaurantsList }}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}


