import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { Button, Input, Header } from 'react-native-elements'
import { ENTRIES1 } from '../utils/food';



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
    console.log("Correct food name: " + foodName)
    this.state = {
      API_URL: 'https://api.yelp.com',
      RES_SEARCH_URL: '/v3/businesses/search',
      API_KEY: 'slBJejlSuGFSOUx8vRNNN2hdBtC18Gy1zEpPR6hBrw2W4FzA6PxAdkRPvlXn46vXCWZi2z2MQph46PYaVKnDKp8MdYAWQeht42ZBzSpdEUSsaZ6gS9L4XL-hbnrKWnYx',
      term: foodName || null,
      latitude: '37.785834',
      longitude: '-122.406417',
      location: 'san francisco, ca',
      radius: '9000',
      restaurants: null,
      isLoading: false,
    };
  }
  componentDidMount() {
    //When the component is loaded
    this._fetchRestaurants()
  }
  async _fetchRestaurants() {
    const { API_KEY, RES_SEARCH_URL, API_URL, term, location, longitude, latitude, radius, } = this.state

    this.setState({ isLoading: true })
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
        // const { businesses, total } = responseJSON
        // console.log("Restaurants length:", total)
        // console.log("Restaurants", businesses)

        this.setState({
          isLoading: false,
          restaurants: responseJSON.businesses,
        })
        // console.log('should be', this.state.restaurants)

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
  _renderRestaurants(restaurant) {
    // const { user, liked, } = this.state;
    const { navigate } = this.props.navigation

    return (
      <View style = {styles.restaurantsRowContainer} key={restaurant}>
        <TouchableOpacity onPress={() => navigate('Restaurant')}>
          <View>
            <Text style={styles.nameLabel}>{restaurant.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  contentView() {
    const { isLoading, restaurants, } = this.state
    console.log("Loading restaurants, so good", restaurants)
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
    return (
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={() => navigate('Restaurant')}>

          <Text style={{ color: 'red' }}>Restaurant click</Text>
        </TouchableOpacity> */}
        {this.contentView()}
        {/* <Button
          title='SEARCH'
          buttonStyle={{
            paddingHorizontal: 5
          }}
          onPress={() => this._fetchRestaurants()}
        /> */}
      </View>
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

  flatListContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'pink',
    alignContent: 'center',
  },
  restaurantsRowContainer: {
    backgroundColor: 'white',
  },
  nameLabel: {
    fontSize: 18,
    color: '#003366',
    marginLeft: 10,
    fontWeight: 'bold'
  },

});
