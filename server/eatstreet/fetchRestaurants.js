import React, { Component } from 'react';
import { AppContext } from '../../app/components/AppProvider'
import CurrentGeoLocationFoodScreen from '../../app/screens/FoodChooseScreen'

export default class FetchRestaurants extends Component {

  constructor() {
    super()
    this.state = {
      
    }
  }

  

  async componentDidMount() {
    await this._fetchRestaurants()
    await this._fetchMenuItems()
  }
  
  render() {
    console.log("MENU-LIST",this.state.menuItemsList)
    return (
      <AppContext.Consumer>
        {context => {
          context.setMenuList(this.state.menuItemsList)
        }}
      </AppContext.Consumer>
    );
  }
}


