import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  Platform,
  Share,
} from 'react-native';
import { Button, Input, Header, Rating, Tile } from 'react-native-elements'
import { MapView, LinearGradient } from 'expo';
import { Entypo, Feather, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import Autolink from 'react-native-autolink';
import { createOpenLink } from 'react-native-open-maps';


const { width } = Dimensions.get('window');


export default class RestaurantScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Restaurants',
    headerTintColor: 'white',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerStyle: { backgroundColor: '#c84343', borderBottomWidth: 0.5, borderBottomColor: '#aaaaaa', },
  });
  constructor(props) {
    super(props)
    const restaurantID = props.navigation.state.params && props.navigation.state.params.restaurantID
    console.log("Correct restaurantID: " + restaurantID)
    this.state = {
      API_URL: 'https://api.yelp.com',
      RES_SEARCH_URL: '/v3/businesses/',
      API_KEY: 'slBJejlSuGFSOUx8vRNNN2hdBtC18Gy1zEpPR6hBrw2W4FzA6PxAdkRPvlXn46vXCWZi2z2MQph46PYaVKnDKp8MdYAWQeht42ZBzSpdEUSsaZ6gS9L4XL-hbnrKWnYx',
      restaurantID: restaurantID || null,
      isLoading: false,
      restaurant: null,
    };
  }
  componentWillMount() {
    //When the component is loaded
    this._fetchRestaurant()
  }
  async _fetchRestaurant() {
    const { API_KEY, RES_SEARCH_URL, API_URL, restaurantID, } = this.state

    this.setState({ isLoading: true })
    try {
      let response = await fetch(`${API_URL}${RES_SEARCH_URL}${restaurantID}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        },
      });
      // console.log(response)
      let responseJSON = null
      if (response.status === 200) {
        responseJSON = await response.json();
        console.log(responseJSON)
        // const { businesses, total } = responseJSON
        // console.log("Restaurants length:", total)
        // console.log("Restaurants", businesses)

        this.setState({
          isLoading: false,
          restaurant: responseJSON,
        })

      } else {
        responseJSON = await response.json();
        const error = responseJSON.details
        // console.log("Server request failed " + error);
        this.setState({ errors: responseJSON.errors })
        Alert.alert('Unable to get you restaurants', `Reason.. ${error}!`)
      }
    } catch (error) {
      console.log("Server is down " + error);
      Alert.alert('Unable to get the feed. Please try again later')
    }
  }
  loadingView = () => {
    return (
      <LinearGradient colors={['#536976', '#292E49']} style={styles.loadingView}>
        <View style={styles.activityIndicatorAndButtonContainer}>
          <ActivityIndicator size="large" />
        </View>
      </LinearGradient>
    )
  }
  regionFrom(lat, lon, distance) {
    distance = distance / 2
    const circumference = 40075
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000
    const angularDistance = distance / circumference

    const latitudeDelta = distance / oneDegreeOfLatitudeInMeters
    const longitudeDelta = Math.abs(Math.atan2(
      Math.sin(angularDistance) * Math.cos(lat),
      Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)))

    return result = {
      latitude: lat,
      longitude: lon,
      latitudeDelta,
      longitudeDelta,
    }
  }
  // categories() {
  //   const { restaurant } = this.state
  //   var types = null;
  //   tags = new Array();

  //   return(
  //     types = restaurant.categories.join()
  //   )
  // }
  todayHours() {
    const { restaurant } = this.state

    var today = new Date();
    var day = today.getDay();
    var start = restaurant.hours[0].open[day].start
    var end = restaurant.hours[0].open[day].end
    // console.log(day)
    return (
      <View style={styles.hoursContainer}>
        <Text style={styles.hoursLabel}>Today: {start.slice(0, 2)}:{start.slice(2, 4)} - {end.slice(0, 2)}:{end.slice(2, 4)}</Text>
      </View>
    )
  }
  moreInfoYelp() {
    console.log("called webview")
    return (
      <WebView
        source={{ uri: 'https://github.com/facebook/react-native' }}
        style={{ marginTop: 20 }}
      />
    )
  }

  gotoRestaurant(latitudeRes, longitudeRes, nameRes) {
    return (
      createOpenLink({ latitude: latitudeRes, longitude: longitudeRes, name: nameRes })
    );
  }
  restaurantRender() {
    const { navigate } = this.props.navigation
    const { restaurant } = this.state
    console.ignoredYellowBox = ['Possible Unhandled Promise Rejection (id:'];

    return (
      <View style={styles.container}>
        <SafeAreaView style={{ backgroundColor: '#c84343', }}>
          <Header
            leftComponent={
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Ionicons
                  name={Platform.OS === 'ios' ? 'ios-arrow-back-outline' : 'md-arrow-back'}
                  color={'white'}
                  size={Platform.OS === 'ios' ? 28 : 20}
                />
              </TouchableOpacity>
            }
            centerComponent={{
              text: 'Restaurant',
              style: {
                color: 'white', fontSize: 20,
                fontWeight: 'bold',
              }
            }}
            rightComponent={
              <TouchableOpacity onPress={() => {
                Share.share(
                  {
                    message: "I've found this restaurant through Pick & Eat! " + (Platform.OS === 'ios' ? restaurant.name : restaurant.url),
                    url: restaurant.url,
                    title: restaurant.name
                  })
                  .then(result => console.log(result))
                  .catch(err => console.log(err));
              }}>
                <Ionicons
                  name={Platform.OS === 'ios' ? 'ios-share-outline' : 'md-share'}
                  color={'white'}
                  size={Platform.OS === 'ios' ? 28 : 20}
                />
              </TouchableOpacity>
            }
            outerContainerStyles={{ backgroundColor: '#c84343' }}
          />
        </SafeAreaView>
        <ScrollView>
          <View style={styles.mapViewContainer}>
            <Tile
              imageSrc={{ uri: restaurant.image_url }}
              title={restaurant.name}
              titleStyle={styles.nameLabel}
              featured
              activeOpacity={1}
              caption={'Your food is served here'}
              captionStyle={styles.foodCaptionStyle}
            >
            </Tile>
            <View style={styles.restaurantInfoContainer}>
              <View style={styles.ratingContainer}>
                <Rating
                  type="custom"
                  readonly
                  ratingColor='#FD9427'
                  startingValue={restaurant.rating}
                  fractions={1}
                  imageSize={20}
                  style={{ paddingVertical: 10 }}
                />
                <Text style={styles.ratingLabel}>{restaurant.review_count} Reviews</Text>
              </View>
              <View style={styles.openHoursContainer}>
                <Feather
                  name='clock'
                  color={'#aaa'}
                  size={Platform.OS === 'ios' ? 22 : 18}
                />
                {this.todayHours()}
                {restaurant.hours[0].is_open_now ?
                  <Text style={styles.openLabel}>Open now</Text> :
                  <Text style={styles.closedLabel}>Closed now</Text>
                }
              </View>


            </View>
            <MapView
              style={styles.mapContainer}
              region={
                this.regionFrom(restaurant.coordinates.latitude, restaurant.coordinates.longitude, 5000)
              }
              showsUserLocation
            >
              <MapView.Marker
                coordinate={this.regionFrom(restaurant.coordinates.latitude, restaurant.coordinates.longitude, 5000)}
                title={restaurant.name}
              />
            </MapView>
            <View style={styles.additionalInfoContainer}>
              <TouchableOpacity onPress={this.gotoRestaurant(restaurant.coordinates.latitude, restaurant.coordinates.longitude, restaurant.name)}>
                <View style={styles.restaurantAddressContainer}>
                  <View>
                    <MaterialIcons
                      name='location-on'
                      color={'#0CBAE8'}
                      size={Platform.OS === 'ios' ? 26 : 25}
                    />
                  </View>
                  <View style={styles.locationTextContainer}>
                    <Text style={styles.hoursLabel}>Directions To:</Text>
                    <Text style={styles.locationLabel}>{restaurant.location.display_address[0]},</Text>
                    <Text style={styles.locationLabel}>{restaurant.location.display_address[1]}</Text>
                  </View>
                  <View style={styles.linkArrowContainer}>
                    <Entypo
                      name='chevron-right'
                      color={'#0CBAE8'}
                      size={Platform.OS === 'ios' ? 26 : 25}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.callContainer}>
                <View>
                  <MaterialIcons
                    name='call'
                    color={'#0CBAE8'}
                    size={Platform.OS === 'ios' ? 26 : 25}
                  />
                </View>
                <View style={styles.callText}>
                  <Autolink
                    text={restaurant.display_phone}
                    phone={true}
                  />
                  {/* <Text>{restaurant.display_phone}</Text> */}
                </View>
                <View style={styles.linkArrowContainer}>
                  <Entypo
                    name='chevron-right'
                    color={'#0CBAE8'}
                    size={Platform.OS === 'ios' ? 26 : 25}
                  />
                </View>
              </View>
              <TouchableOpacity onPress={() => navigate('Yelp', { restaurantURL: restaurant.url })} >
                <View style={styles.moreInfoContainer}>
                  <View>
                    <MaterialCommunityIcons
                      name='dots-horizontal'
                      color={'#0CBAE8'}
                      size={Platform.OS === 'ios' ? 26 : 25}
                    />
                  </View>
                  <View style={styles.callText}>

                    <Text>More Info</Text>
                  </View>
                  <View style={styles.linkArrowContainer}>
                    <Entypo
                      name='chevron-right'
                      color={'#0CBAE8'}
                      size={Platform.OS === 'ios' ? 26 : 25}
                    />
                  </View>

                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View >
    )
  }
  render() {
    const { isLoading } = this.state

    return (
      (isLoading ? this.loadingView() : this.restaurantRender())

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    color: 'white'
  },
  mapViewContainer: {
    flex: 1,

  },
  mapContainer: {
    // flex: 1,
    height: (width) / 2,
    width: '100%',
  },
  nameLabel: {
    fontSize: 30,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontWeight: 'bold'
  },
  foodCaptionStyle: {
    fontSize: 18,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: -2, height: 1 },
    textShadowRadius: 5,
  },

  restaurantImage: {
    height: (width) / 2,
    width: '100%',
  },
  openHoursContainer: {
    flex: 1,
    marginVertical: 15,
    flexDirection: 'row',
    alignSelf: 'center',
    height: (width) / 8,
    width: '90%',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgb(240,240,240)',
    marginBottom: 20,

  },
  hoursContainer: {
    // marginRight: 15,
    paddingRight: 15,
  },
  hoursLabel: {
    fontSize: 16,
    color: '#aaa',
  },
  openLabel: {
    fontSize: 16,
    color: '#0CE89C',
  },
  closedLabel: {
    fontSize: 16,
    color: 'red',
  },
  restaurantInfoContainer: {
    flex: 1,
  },
  ratingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  ratingLabel: {
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  additionalInfoContainer: {
  },
  restaurantAddressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1.5,
    paddingLeft: 16,
    height: 80,
  },
  locationTextContainer: {
    paddingHorizontal: 10,
  },
  callContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1.5,
    height: 50,
    paddingLeft: 16,
  },
  callText: {
    paddingHorizontal: 10,
  },
  moreInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingLeft: 16,
  },
  linkArrowContainer: {
    position: 'absolute',
    right: 0,
    paddingRight: 10,
  }
});
