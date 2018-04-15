import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Image,
  ActivityIndicator
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { 
  Icon, 
  Header, 
  Button
} from 'react-native-elements';
import { LinearGradient } from 'expo';
import { ENTRIES1 } from '../utils/food';

export default class FoodChooseScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      isLoading: true,
      updatedFood: null,
    }
  }

  static navigationOptions = {
    header: null,
  };

  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            this.props.navigation.navigate('RestaurantsList', { foodName: item.title })
          }
        >
          <Image style={styles.images} source={{ uri: item.illustration }} />
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
      <LinearGradient colors={['#ff9966', '#F2C94C']} style={styles.loadingView}>
        <View style={styles.activityIndicatorAndButtonContainer}>
          <ActivityIndicator size="large" />
          <View style={styles.getLocationbuttonContainer}>
            <Button
              raised
              icon={{name: 'my-location'}}
              title='Get Location' 
              onPress={this.getCurrentLocation}
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
        <View style={styles.imageContainer}>
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={ENTRIES1}
            renderItem={this._renderItem.bind(this)}
            sliderWidth={400}
            itemWidth={200}
          />
        </View>
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const { isLoading } = this.state;
    console.log( isLoading );

    return (
      <View style={styles.mainContainer}>
        { isLoading ? this.loadingView() : this.contentView()}
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
    alignContent: 'center',
  },

  photoPostIcon: {
    color: 'pink',
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  images: {
    width: "100%",
    height: 250,
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
});
