import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Platform,
  Dimensions,
  DeviceEventEmitter,
} from 'react-native';
import { Icon, Header, Button } from 'react-native-elements';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';

export default class FavSlide extends React.Component{
  constructor(props) {
    super(props);

    const { item } = props;

    this.state = {
      isFavorited: item.isFavorited,
    };
  }
  onFavoriteButtonPress = async () => {
    const { isFavorited } = this.state;
    const { onFavoriteButtonPressEmit } = this.props;

    const { item } = this.props;


    try {
      item.isFavorited = !isFavorited;
      if (!isFavorited) {
        await AsyncStorage.setItem(item.illustration, JSON.stringify(item));
      } else {
        await AsyncStorage.removeItem(item.illustration);
      }
      onFavoriteButtonPressEmit();
    } catch (error) {
      // Error saving data
    }
    DeviceEventEmitter.emit('setMyFoodUpdated');
    
    this.setState({ isFavorited: !isFavorited });
    console.log( "FavSlide: " + item.illustration)

  }



  renderFavoriteButton = () => {
    const { item } = this.props;

    return (
      <TouchableOpacity onPress={this.onFavoriteButtonPress}>
        <Ionicons
          name={this.state.isFavorited ? "ios-heart" : "md-heart-outline"}
          color={this.state.isFavorited ? 'red' : 'white'} size={35}

        />
      </TouchableOpacity>
    );

  }
  render = () => {
    const { item } = this.props;
    const { image, name, description } = item;
    const { navigate } = this.props.navigation

    return (
      <View style={styles.slide}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            this.props.navigation.navigate('RestaurantsList', { foodName: item.title })
          }
        >
          <Image style={styles.images} source={{ uri: item.illustration }} />
          <View style={styles.foodInteraction}> 
          <View style={styles.foodInfo}>
            <Text style={styles.foodName} numberOfLines={2}>
              {item.title}
            </Text>
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

const styles = StyleSheet.create({
  photoPostIcon: {
    color: 'pink',
  },
  images: {
    width: "100%",
    height: '90%',
    resizeMode: 'cover',
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
  slide: {
    flex: 1,
    justifyContent: 'center',
  },
  foodInteraction: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // position: 'absolute'
  },
  foodInfo: {
    // marginRight: '55%',
    // position: 'relative',
    // bottom: Platform.OS === 'ios' ? -1 : 1,
    // alignSelf: 'center',
  },
  foodName: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',

  },
  buttonContainer: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 56,
    paddingRight: 0,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 55 : 30,
    right: 0,

  },
});
