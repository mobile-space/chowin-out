import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList,Platform, DeviceEventEmitter } from 'react-native';
import { LinearGradient } from 'expo';


import FavCard from '../components/FavCard';

const DATA = require('../../assets/data.json');

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
      food: DATA.food,
      updatedFood: null,
    };
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('setFoodUpdated', ({ updatedFood }) => {
      this.foodUpdated({ updatedFood });
    });
  }

  foodUpdated = ({ updatedFood }) => {
    this.setState({ updatedFood });
    this.forceUpdate();
  }



  renderFood = ({ item: food, index }) => {

      const { updatedFood } = this.state;
     
      
      return (
        
        <FavCard
          food={updatedFood && updatedFood.id === food.id ? updatedFood : food}
          navigation={this.props.navigation}
          onFavoriteButtonPressEmit={() => {
            DeviceEventEmitter.emit('setMyFoodUpdated');
          }}
        />
      );
  };

  render() {
   
    return (
      <View style={styles.mainContent}  >
       <LinearGradient colors={['#000000', '#434343']} style={styles.mainContainer}>
       <View style={styles.foodInfo}>
        <Text style= {styles.foodTitle}> Your Favorite List  </Text>
      </View> 
      </LinearGradient>

  
      <FlatList
        data={this.state.food}
        keyExtractor={(food, index) => index.toString()}
        renderItem={this.renderFood}
      />

      </View>
    );
  }
}

const padding = 4;
const headerHeight = 60;

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
  },
  foodInfo: {
    alignContent: 'center',
    justifyContent: 'center',
    height: 55,
  },
  foodTitle: {
    color: 'white',
    fontWeight: '200',
    fontSize: 28,

  },

  header: {
    padding,
    height: headerHeight,
    position: 'absolute',
  },
  headerBackground: {
    backgroundColor: '#ff9966',
    height: headerHeight * 1.6,
    zIndex: -1000,
  },
  introText: {
    fontWeight: '100',
    fontSize: 26,
    color: '#FFF',
    
  },
  locationContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  
  
});

