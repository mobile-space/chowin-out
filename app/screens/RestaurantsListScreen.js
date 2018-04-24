import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import { Rating } from 'react-native-elements'
import { ENTRIES1 } from '../utils/food';
import AppProvider, { AppContext } from '../components/AppProvider';



export default class RestaurantsListScreen extends React.Component {
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
    const foodName = props.navigation.state.params && props.navigation.state.params.foodName
    const latitude = props.navigation.state.params && props.navigation.state.params.latitude
    const longitude = props.navigation.state.params && props.navigation.state.params.longitude
    console.log("Correct food name: " + foodName)
    this.state = {
      API_URL: 'https://api.yelp.com',
      RES_SEARCH_URL: '/v3/businesses/search',
      API_KEY: 'slBJejlSuGFSOUx8vRNNN2hdBtC18Gy1zEpPR6hBrw2W4FzA6PxAdkRPvlXn46vXCWZi2z2MQph46PYaVKnDKp8MdYAWQeht42ZBzSpdEUSsaZ6gS9L4XL-hbnrKWnYx',
      term: foodName || null,
      radius: '9000',
      restaurants: null,
      isLoading: false,
      locationUS: true,
      loadedOnce: false,
      latitude: latitude || null,
      longitude: longitude || null,
    };
  }
  // componentDidMount() {
  //   //When the component is loaded
  //   this._fetchRestaurants()
  // }
  async _fetchRestaurants(context) {
    const { API_KEY, RES_SEARCH_URL, API_URL, term, radius, latitude, longitude } = this.state

    this.setState({ isLoading: true, loadedOnce: true, })
    try {
      let response = await fetch(`${API_URL}${RES_SEARCH_URL}?term=${term}&latitude=${latitude}&longitude=${longitude}&radius=${radius}`, {
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

        this.setState({
          isLoading: false,
          restaurants: responseJSON.businesses,
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

  _renderDistance(distance) {
    const { locationUS } = this.state
    if (locationUS)
      return (
        <Text style={styles.distanceLabel}>{(distance * 0.000621371192).toPrecision(2)} mi</Text>
      )
    else {
      <Text style={styles.distanceLabel}>{distance.toPrecision(3)}meters</Text>
    }
  }
  _renderRestaurants(restaurant) {
    const { navigate } = this.props.navigation

    return (
      <View style={styles.restaurantsRowContainer} key={restaurant}>
        <TouchableOpacity 
        onPress={() => navigate('Restaurant', { restaurantID: restaurant.id })}
        activeOpacity={0.6}
        >
          <View style={styles.nameContainer}>
            <Text style={styles.nameLabel}>{restaurant.name}</Text>
            <View styles={styles.distanceContainer}>
              {this._renderDistance(restaurant["distance"])}
            </View>
          </View>
          <View style={styles.restaurantInfoContainer}>
            <View style={styles.restaurantImageContainer}>
              <Image
                style={styles.restaurantImage}
                source={{ uri: restaurant.image_url }}
              />
            </View>
            <View style={styles.restaurantDetailsContainer}>
              <View style={styles.ratingContainer}>
                <Rating
                  type="custom"
                  ratingColor='#FD9427'
                  readonly
                  startingValue={restaurant.rating}
                  fractions={1}
                  // onFinishRating={restaurant.rating}              
                  imageSize={20}
                  style={{ paddingVertical: 10 }}
                />
                <Text style={styles.ratingLabel}>{restaurant.review_count} Reviews</Text>

              </View>
              <View style={styles.locationInfoContainer}>
                <View style={styles.locationContainer}>
                  <Text style={styles.locationLabel}>{restaurant.location.display_address[0]}</Text>
                  <Text style={styles.locationLabel}>{restaurant.location.display_address[1]}</Text>
                </View>

              </View>
            </View>
          </View>

        </TouchableOpacity>
      </View>
    )
  }
  contentView() {
    const { isLoading, restaurants, } = this.state
    // console.log("Loading restaurants, so good", restaurants)
    return (
      <View style={styles.flatListContainer}>

        <FlatList
          data={restaurants}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this._renderRestaurants(item)}
        // onRefresh={() => this.getFeed()}
        // refreshing={isLoading}
        />
      </View>
    )
  }
  render() {
    const { navigate } = this.props.navigation
    const { loadedOnce } = this.state;

    return (
      <AppContext.Consumer>
        {
          (context) => {
            if(!loadedOnce){
              this._fetchRestaurants(context)
            }
            return (            
            <View style={styles.container}>
              {this.contentView()}
            </View>
            )

          }
        }
      </AppContext.Consumer>
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
  navBar: {
    color: 'white'
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  restaurantsRowContainer: {
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: 'white',
    // justifyContent: 'space-around',
    // alignContent: 'center',
    // alignItems: 'center',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1.5,

  },
  restaurantImageContainer: {
    height: 70,
    width: 70,
    backgroundColor: 'white'
  },
  restaurantImage: {
    height: 70,
    width: 70,
  },
  restaurantInfoContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  restaurantDetailsContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  nameLabel: {
    fontSize: 20,
    color: '#003366',
    marginLeft: 10,
    fontWeight: 'bold'
  },
  locationInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  ratingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,

  },
  ratingLabel: {
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  }
});
