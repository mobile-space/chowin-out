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
  Alert,
} from 'react-native';
import { Icon, Header, Button } from 'react-native-elements';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import FavSlide from '../components/FavSlide';

import { ENTRIES1 } from '../utils/food';
import AppProvider, { AppContext } from '../components/AppProvider';
import _fetchRestaurants from '../eatstreet/fetchRestaurants'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

export default class FoodChooseScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      imagesLoaded: false,
      foodImages: null,
      API_URL: 'http://api.yummly.com',
      RES_SEARCH_URL: '/v1/api/recipes?',
      APP_ID: 'eb4e23c7',
      RES_SEARCH_URL1: '&_app_key=',
      API_KEY: '851038fb4920d6b523e47c79320c858e',
      search: 'Roasted Root Vegetables with Tomatoes and Kale',
      picture: '&requirePictures=true',
      lat: null,
      long: null,
      isLoading: true,
      fetchedData: false,
      foodNameList: null
    };
  }

  componentDidMount() {
    //When the component is loaded
    this.getCurrentLocation()
    // this._renderYummlyApiForFoodImage()
  }

  _renderYummlyApiForFoodImage = async (foodNameList) => {
    const fetched_data = []
    for (let i = 0; i < 10; i++) {
      await this._getYummlyImages(foodNameList[i])
      .then(yummlyImage => {
        if(yummlyImage) {
          yummlyImage["foodName"]=foodNameList[i]
          fetched_data.push(yummlyImage)
        }
      })
    }

    this.setState({
      fetchedData: true,
      foodImages: fetched_data
    })
  }
  
  async _getYummlyImages(search) {
    const {API_URL, RES_SEARCH_URL, APP_ID, API_KEY, picture } = this.state;
    this.setState({ imagesLoaded: true });

    let food_image = null

    try {
      let response = await fetch(`${API_URL}${RES_SEARCH_URL}_app_id=${APP_ID}&_app_key=${API_KEY}&q=${search}${picture}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
        });

      var responseJSON = null

      if (response.status === 200) {

        responseJSON = await response.json();
        console.log("Preloaded", responseJSON)
        // console.log("MATCHES-LENGTH", responseJSON.matches.length)
        

        if (typeof responseJSON.matches != 'undefined' && responseJSON.matches.length > 0) {
          food_image = responseJSON.matches[0]
        }
        // console.log(imagesLoaded)
        // console.log("not loaded food",foodImages)
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)
        console.log(imagesLoaded)
        this.setState({ errors: responseJSON.errors })
        // Alert.alert('Unable to get your feed', `Reason.. ${error}!`)
      }
    } catch (error) {
      this.setState({ imagesLoaded: false, response: error })

      console.log(error)

      // Alert.alert('Unable to get the feed. Please try again later')
    }

    // console.log("food_image:", food_image)
    return food_image;
    this.setState({
      imagesLoaded: false,
      // foodImages: fetched_data
    })
  }

  _renderItem({ item, index }) {
    const { lat, long } = this.state
    if(item){
      return (
        <FavSlide
          item={item}
          navigation={this.props.navigation}
          lat = {lat}
          long={long}
        />
      );
    }
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (position.coords.latitude && position.coords.longitude) {
          // context.setLatitude(position.coords.latitude);
          // context.setLongitude(position.coords.longitude);
          // context.setIsLoading(false);
          // context.setError(null);
          this.setState({ lat: position.coords.latitude, long: position.coords.longitude })
        }
        _fetchRestaurants(position.coords.latitude, position.coords.longitude)
          .then( data => {
            // console.log("DATA", data)
            this._renderYummlyApiForFoodImage(data)
            // this.setState({foodNameList: data})
          })
          .catch(error => {
            console.log(error)
          })
          
        // fetchEatStreetApiData(this.state.lat, this.state.long).then( data => console.log(data))
        // console.log("BigFoodList:", bigMenuList)

        this.setState({ isLoading: false });
        // this._getYummlyImages()
      },
      (error) => {
        console.log(error)
        // context.setIsLoading(true);
        // context.setError(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  loadingView = () => {
    return (
      <LinearGradient colors={['#536976', '#292E49']} style={styles.loadingView}>
        <View style={styles.activityIndicatorAndButtonContainer}>
          <ActivityIndicator size="large" />
          <View style={styles.getLocationbuttonContainer}>
            <Button
              raised
              icon={{ name: 'my-location' }}
              title='Get Location'
              buttonStyle={styles.getLocationButton}
              onPress={this.getCurrentLocation.bind(this)}
            // onPress={console.log('current location pressed')}
            />
          </View>
        </View>
      </LinearGradient>
    )
  }
  loadingImages = () => {
    return (
      <LinearGradient colors={['#536976', '#292E49']} style={styles.loadingView}>
        <View style={styles.activityIndicatorAndButtonContainer}>
          <ActivityIndicator size="large" />
        </View>
      </LinearGradient>
    )
  }

  contentView = () => {
    const { foodImages, imagesLoaded } = this.state
    console.log("loaded food",foodImages)
    // console.log("LOOP is working")
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={{ backgroundColor: '#c84343', }}>
          <Header
            // leftComponent={
            //   <TouchableOpacity>
            //     <Icon
            //       name='filter-variant'
            //       type='material-community'
            //       size={25}
            //       iconStyle={styles.navbarIcon}
            //     />
            //   </TouchableOpacity>
            // }
            centerComponent={{
              text: 'Pick & Eat',
              style: {
                color: 'white', fontSize: 20,
                fontWeight: 'bold',
              }
            }}
            // rightComponent={
            //   <TouchableOpacity>
            //     <Icon
            //       name='search'
            //       type='feather'
            //       size={25}
            //       iconStyle={styles.navbarIcon}
            //     />
            //   </TouchableOpacity>
            // }
            outerContainerStyles={{ backgroundColor: '#c84343' }}
          />
        </SafeAreaView>
        <LinearGradient colors={['#536976', '#292E49']} style={styles.mainContainer}>
          <View style={styles.imageContainer}>
            {foodImages === null ?
              this.loadingImages() :
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={foodImages}
                // data = {ENTRIES1}
                renderItem={this._renderItem.bind(this)}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                style={styles.carouselContainer}
              />}
          </View>
        </LinearGradient>

      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const { loadedOnce, foodImages, isLoading, fetchedData } = this.state;
    return (
        <View style={styles.mainContainer}>
        { isLoading ? this.loadingView() : this.contentView() }
      </View>

    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  navbarIcon: {
    color: 'white',
  },

  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

  getLocationbuttonContainer: {
    marginTop: 200,
  },
  getLocationButton: {
    backgroundColor: "#c84343",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
});