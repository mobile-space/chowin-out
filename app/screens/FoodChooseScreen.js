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
      loadedOnce: false,
      imagesLoaded: false,
      foodImages: null,
      API_URL: 'http://api.yummly.com',
      RES_SEARCH_URL: '/v1/api/recipes?_app_id=',
      APP_ID: 'eb4e23c7',
      RES_SEARCH_URL1: '&_app_key=',
      API_KEY: '851038fb4920d6b523e47c79320c858e',
      search: '&q=Roasted Root Vegetables with Tomatoes and Kale',
      picture: '&requirePictures=true'

    };
  }
  componentDidMount() {
    //When the component is loaded
    this._getYummlyImages()

  }
  async _getYummlyImages() {
    const { search, picture } = this.state;
    this.setState({ imagesLoaded: true });


    try {
      let response = await fetch(`http://api.yummly.com/v1/api/recipes?_app_id=eb4e23c7&_app_key=851038fb4920d6b523e47c79320c858e&${search}${picture}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
        });

      let responseJSON = null

      if (response.status === 200) {

        responseJSON = await response.json();
        console.log("Preloaded", responseJSON)

        this.setState({
          imagesLoaded: false,
          foodImages: responseJSON.matches,
        })
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
  }

  _renderItem({ item, index }) {
    return (
      <FavSlide
        item={item}
        navigation={this.props.navigation}
      />
    );
  }

  getCurrentLocation(context) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (position.coords.latitude && position.coords.longitude) {
          context.setLatitude(position.coords.latitude);
          context.setLongitude(position.coords.longitude);
          context.setIsLoading(false);
          context.setError(null);
        }
        this.setState({ loadedOnce: true });
        // this._getYummlyImages()
      },
      (error) => {
        context.setIsLoading(true);
        context.setError(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  loadingView = (context) => {
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
              onPress={this.getCurrentLocation.bind(this, context)}
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
    // console.log("loaded food",foodImages)
    // console.log("LOOP is working")
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={{ backgroundColor: '#c84343', }}>
          <Header
            leftComponent={
              <TouchableOpacity>
                <Icon
                  name='filter-variant'
                  type='material-community'
                  size={25}
                  iconStyle={styles.navbarIcon}
                />
              </TouchableOpacity>
            }
            centerComponent={{
              text: 'Food',
              style: {
                color: 'white', fontSize: 20,
                fontWeight: 'bold',
              }
            }}
            rightComponent={
              <TouchableOpacity>
                <Icon
                  name='search'
                  type='feather'
                  size={25}
                  iconStyle={styles.navbarIcon}
                />
              </TouchableOpacity>
            }
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
    const { loadedOnce, foodImages } = this.state;
    return (
      // <AppContext.Consumer>
      //   {
      //     (context) => {
      //       if (!loadedOnce) {
      //         this.getCurrentLocation(context);
      //       }

      //       if (context.state.isLoading) {
      //         return this.loadingView(context)

      //       } else {
      //         return this.contentView()

      //       }
      //     }
      //   }
      // </AppContext.Consumer>
        <View style={styles.mainContainer}>
        { loadedOnce  ? this.loadingView() : this.contentView() }
        {/* {this.contentView()} */}
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
