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

import { ENTRIES1 } from '../utils/food';

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
      latitude: null,
      longitude: null,
      error: null,
      isLoading: true,
      updatedFood: null,
      isFavorited: false,
    }
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

  onFavoriteButtonPress = async () => {
    const { isFavorited } = this.state;
    const { onFavoriteButtonPressEmit } = this.props;

    // DeviceEventEmitter.emit('setMyFoodUpdated');
    this.setState({ isFavorited: !isFavorited });

  }

  renderFavoriteButton = () => {
    const { food } = this.props;

    return (
      <TouchableOpacity onPress={this.onFavoriteButtonPress}>
        <Ionicons
          name={this.state.isFavorited ? "ios-heart" : "md-heart-outline"}
          color={this.state.isFavorited ? 'red' : 'white'} size={35}
          
        />
      </TouchableOpacity>
    );

  }

  _renderItem({ item, index }) {
    const { updatedFood } = this.state;
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
  }

  componentWillMount() {
    this.getCurrentLocation();
  }

  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });

        this.setState({ isLoading: false });
        console.log(`isLoading: ${this.state.isLoading}`);
        console.log(`The latitude is ${this.state.latitude}`);
        console.log(`The longitude is ${this.state.longitude}`);

      },
      (error) => this.setState({
        error: error.message,
        isLoading: true
      }),
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
              onPress={this.getCurrentLocation}
              buttonStyle={styles.getLocationButton}
            />
          </View>
        </View>
      </LinearGradient>
    )
  }

  contentView = () => {
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
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={ENTRIES1}
              renderItem={this._renderItem.bind(this)}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              style={styles.carouselContainer}
            />
          </View>
        </LinearGradient>

      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const { isLoading } = this.state;
    console.log(isLoading);

    return (
      <View style={styles.mainContainer}>
        {isLoading ? this.loadingView() : this.contentView()}
      </View>
    );
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

  getLocationbuttonContainer: {
    marginTop: 200,
  },
  getLocationButton:{
    backgroundColor: "#c84343",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
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
