import React, { Component } from 'react';
import { AppContext } from '../../app/components/AppProvider'
import CurrentGeoLocationFoodScreen from '../../app/screens/FoodChooseScreen'

export default class FetchRestaurants extends Component {

  constructor() {
    super()
    this.state = {
      API_URL: 'https://api.eatstreet.com',
      RES_SEARCH_URL: '/publicapi/v1/restaurant/search',
      RES_URL: '/publicapi/v1/restaurant/',
      API_KEY: 'ba2d3e545f0d2bd1',
      method: 'both',
      search: 'vegan',
      latitude: '37.785834',
      longitude: '-122.406417',
      streetAddress: 'san francisco',
      pickupRadius: '5',
      restaurantsList: null,
      menuItemsList: null
    }
  }

  _fetchRestaurants = async () => {
    const { API_KEY, RES_SEARCH_URL, API_URL, method, search, streetAddress, longitude, latitude, pickupRadius } = this.state

    this.setState({ isLoading: true })

    await fetch(`${API_URL}${RES_SEARCH_URL}?method=${method}&search=${search}&longitude=${longitude}&latitude=${latitude}&pickup-radius=${pickupRadius}`, {
      method: 'GET',
      headers: {
        'X-Access-Token': `${API_KEY}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        const { restaurants } = { ...data }
        let restApiKeyList = []
        for (let { apiKey: restApiKey } of restaurants) {
          restApiKeyList.push(restApiKey)
        }
        console.log('RES-JSON-restApiKeyList:', restApiKeyList)

        this.setState({ restaurantsList: restApiKeyList })
      })
      .catch(error => {
        console.log("Server is down " + error);
      })
  }

  _fetchMenuItems = () => {
    const { API_KEY, RES_URL, API_URL, restaurantsList, menuItemsList } = this.state

    this.setState({ isLoading: true })

    let restMenuItemsList = []
    for (let resApiKey of restaurantsList) {
      fetch(`${API_URL}${RES_URL}${resApiKey}/menu`, {
        method: 'GET',
        headers: {
          'X-Access-Token': `${API_KEY}`,
        }
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log('data', data)
          restMenuItemsList.push(data)
          this.setState({ menuItemsList: restMenuItemsList })
        })
        .catch(error => {
          console.log("Server request failed " + error);
        })
    }
  }

  async componentDidMount() {
    await this._fetchRestaurants()
    await this._fetchMenuItems()
  }
  
  render() {
    return (
      <AppContext.Consumer>
        {context => {
          context.setMenuList(this.state.menuItemsList)
        }}
      </AppContext.Consumer>
    );
  }
}


