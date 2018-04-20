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
} from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
  Icon,
  Header,
  Button
} from 'react-native-elements';
import { LinearGradient } from 'expo';
import { ENTRIES1 } from '../utils/food';
import AppProvider, { AppContext } from '../components/AppProvider';

export default class FoodChooseScreen extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   latitude: null,
    //   longitude: null,
    //   error: null,
    //   isLoading: true,
    //   updatedFood: null,
    // }
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
          <View style={styles.foodInfo}>
            <Text style={styles.foodName} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  // componentWillMount() {
  //    this.getCurrentLocation();
  // }

  getCurrentLocation(context) {
    console.log(context)
    console.log('contexxt above')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        context.setIsLoading(false)
        // this.setState({
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        //   error: null,
        // });

        // this.setState({ isLoading: false });
        // console.log(`isLoading: ${this.state.isLoading}`);
        // console.log(`The latitude is ${this.state.latitude}`);
        // console.log(`The longitude is ${this.state.longitude}`);
      },
      (error) => this.setState({
        error: error.message,
        isLoading: true
      }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  loadingView = (context) => {
    return (
      <LinearGradient colors={['#ff9966', '#F2C94C']} style={styles.loadingView}>
        <View style={styles.activityIndicatorAndButtonContainer}>
          <ActivityIndicator size="large" />
          <View style={styles.getLocationbuttonContainer}>
            <Button
              raised
              icon={{ name: 'my-location' }}
              title='Get Location'
              onPress={this.getCurrentLocation.bind(this, context)}
              // onPress={console.log('current location pressed')}
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
            sliderWidth={400}
            itemWidth={275}
            style={styles.carouselContainer}
          />
        </View>
        </LinearGradient>

      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <AppContext.Consumer>
        {
          // context => 
          // <View
          //   style={{
          //     flex: 1, justifyContent: 'center', alignItems: 'center'
          //   }}>
          //   <Text 
          //     style={{marginBottom: 20}}>
          //     {context.state.name}
          //   </Text>
          //   <Button 
          //     title="Change name"
          //     onPress={() => context.setName('moni')}
          //   />
          // </View>
          (context) => context.state.isLoading ? this.loadingView(context) : this.contentView()
        }
      </AppContext.Consumer>
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
    height: 350,
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
  foodInfo: {
    // marginRight: '55%',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? -1 : 1,
  },
  foodName: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    // alignContent: 'center',
  }
});
