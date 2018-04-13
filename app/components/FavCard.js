import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, View, Image, Text, TouchableOpacity, AsyncStorage, DeviceEventEmitter } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

class FavCard extends Component {
  constructor(props) {
    super(props);

    const { food } = props;

    this.state = {
      isFavorited: food.isFavorited,
    };
  }
 
  onFavoriteButtonPress = async () => {
    const { navigation, food } = this.props;
    const { navigate } = navigation;

      const { isFavorited } = this.state;
      const { onFavoriteButtonPressEmit } = this.props;

      this.setState({ isFavorited: !isFavorited });
    
  }

  renderFavoriteButton = () => {
    const { food } = this.props;
    
      return (
        <TouchableOpacity onPress={this.onFavoriteButtonPress}>
          <View style={styles.circleButton}>
            <Ionicons
             name={this.state.isFavorited ? "ios-heart" : "ios-heart-outline"}
             color={this.state.isFavorited ? 'red' : 'black'} size={30}/>
            

          </View>
        </TouchableOpacity>
      );
    
  }

  render = () => {
    const { food } = this.props;
    const {
      image, name, description
    } = food;
    const { navigate } = this.props.navigation


    return (
      <View style={styles.container}>
        <TouchableOpacity 
        style={styles.imageContainer}
        onPress={() => navigate('FoodDetails')}
        
       >
          <View>
            <Image
              style={styles.image}
              source={{ uri: image }}
            />
           <View style={styles.foodInfo}>
              <Text style={styles.foodName}>{name}</Text>
              {/* <Text style={styles.eventDescription}>{description}</Text> */}
            </View>

            <View style={styles.buttonContainer}>
              {this.renderFavoriteButton()}
            </View>
          </View>
        </TouchableOpacity>
    
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
  circleButton: {
    height: 48,
    width: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
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