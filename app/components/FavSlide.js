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
  AsyncStorage,
  DeviceEventEmitter,
  Alert,
} from 'react-native';
import { Icon, Header, Button } from 'react-native-elements';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';

export default class FavSlide extends React.Component{
  constructor(props) {
    super(props);

    const { item, lat, long, screen } = props;

    this.state = {
      isFavorited: false,
    };
  }
  onFavoriteButtonPress = async () => {
    const { item } = this.props;
    const { isFavorited } = this.state;
    const { onFavoriteButtonPressEmit } = this.props;

    this.setState({ isFavorited: !isFavorited });


    try {
      let con = {
        foodId: item.id,
      }

      function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
          if (list[i].foodId === obj) {
            return true;
          }
        }

        return false;
      }

      AsyncStorage.getItem('foodIds')
        .then((foodIds) => {
          const c = foodIds ? JSON.parse(foodIds) : [];
          // console.log("Display the list", c)
          // console.log("item id", item.id)
          if (containsObject(item.id, c)) {
            console.log("in the list", true);
            Alert.alert(
              "It's there",
              "You've already addded this food to your list before"
            )

          }
          else {
            c.push(con);

          }
          AsyncStorage.setItem('foodIds', JSON.stringify(c));
          DeviceEventEmitter.emit('new_food_liked', {})
        });

    } catch (error) {
      alert(error)
    }

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
  renderImage(item) {
    var urlImage = item.replace(/=s90-c/i, "=s1080")
    // console.log(urlImage)
    return (
      <Image style={styles.images} source={ {uri: urlImage}} />
    )
  }
  render = () => {
    const { item, lat, long, screen } = this.props;
    const { image, name, description } = item;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.slide}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            screen === "Restaurant" ? 
            this.props.navigation.navigate('RestaurantsList', { foodName: item.foodName, latitude: lat, longitude: long }):
            this.props.navigation.navigate('FoodRecipe', { foodID: item.id })
          }
        >
          {this.renderImage(item.imageUrlsBySize[90])}
          
          <View style={styles.foodInteraction}> 
          <View style={styles.foodInfo}>
            <Text style={styles.foodName} numberOfLines={2}>
              {screen === "Restaurant" ? item.foodName : item.recipeName}
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

const { width } = Dimensions.get('window');


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
    bottom: Platform.OS === 'ios' ? width/6.5 : width/6,
    right: 0,

  },
});
