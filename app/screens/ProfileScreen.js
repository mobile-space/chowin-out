import React, { Component } from 'react';
import { FlatList, DeviceEventEmitter, AsyncStorage } from 'react-native';


import EventCard from '../components/FavSlide';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    headerTintColor: 'white',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    }, 
    headerStyle: { backgroundColor: '#c84343', borderBottomWidth: 0.5, borderBottomColor: 'white', },
  });

  constructor(props) {
    super(props);

    this.state = {
      items: null,
    };
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('setMyFoodUpdated', () => {
      this.loadFoods();
    });

    this.loadFoods();
  }

  loadFoods = async () => {
    try {
      AsyncStorage.getAllKeys((error, keys) => {
        AsyncStorage.multiGet(keys, (err, items) => {
          this.setState({
            items: items.map((result, i, store) => (
              JSON.parse(store[i][1])

             
            )),
          });
        });
      });
    } catch (error) {
      // Error saving data
    }
  }

  renderFood = ({ item }) => (
    <EventCard
      item={item}
      navigation={this.props.navigation }
      onFavoriteButtonPressEmit={() => {
        this.loadEvents();
      
        DeviceEventEmitter.emit('setFoodUpdated', { updatedFood: item });
      }}
    />
  );

  render() {
    const { items } = this.state;

    if (!items) {
      return null;
    }
   
    return (
      
      <FlatList
        data={items}
        keyExtractor={(item, index) => index}
        renderItem={({ item: item, index }) => this.renderFood({ item, index })}
      />
    );

  }
}




