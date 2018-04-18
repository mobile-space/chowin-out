import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, View, Text, ActivityIndicator,TouchableWithoutFeedback, TouchableOpacity,AsyncStorage, DeviceEventEmitter } from 'react-native';
import Image from 'react-native-image-progress';
import { Ionicons } from '@expo/vector-icons';

// import Progress from 'react-native-progress';

import ProgressBar from 'react-native-progress/Bar';

class FavCard extends Component {
  constructor(props) {
    super(props);

    const { food } = props;

    this.state = {
      isFavorited: food.isFavorited,
      isLoading: true,

     
    };
  }
 
  onFoodClick = () => {
    const { navigation, food } = this.props;
    const { navigate } = navigation;

    if (food.transaction) {
     
        navigate('FoodDetails', { food });
      
    } else {
      navigate('FoodDetails', { food });
    }
  }

 

  renderFavoriteButton = () => {
    const { food } = this.props;
    
      return (
        <TouchableOpacity onPress={this.onFavoriteButtonPress}>
        
            <Ionicons
             name={this.state.isFavorited ? "ios-heart" : "md-heart-outline"}
             color={this.state.isFavorited ? 'red' : 'white'} size={35}/>
          
        </TouchableOpacity>
      );
    
  }

  loadingView() {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    )
  }


  render = () => {
    const { food } = this.props;
    const { image, name, description } = food;
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
        style={styles.imageContainer}
        onPress={this.onFoodClick}
        
       >
          <View>
            <Image
              style={styles.image}
              source={{ uri: image }}
              indicator={ProgressBar} 
              indicatorProps={{
                size: 98,
                borderWidth: 1,
                color: 'rgba(0,255,0,0.3)',
                unfilledColor: 'rgba(200, 200, 200, 0.2)'
              }}
              style={{
                width: '100%', 
                height: 240, 
                
              }}
            />
           <View style={styles.foodInfo}>
              <Text style={styles.foodName}>{name}</Text>
            </View>

           
          </View>
        </TouchableWithoutFeedback>
    
      </View>
    );
  };
}


const padding = 0;
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding,

  },
  imageContainer: {

  },
  image: {
    height: (width - 2 * padding) / 2,
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    height: 56,
    paddingRight: 0,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? -1 : 11,
    right: padding,
  },
  
  foodText: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 32 : 16,
    height: 56,
  },

 
  foodInfo: {
    marginRight : '55%',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? -1 : 1,

  },
  foodName: {
    fontSize: 20,
    color: 'white',

  },

  foodDescription: {
    color: 'white',
    fontSize: 14,
  },


});

export default FavCard;