import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Button, Input, Header } from 'react-native-elements'


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
  componentDidMount() {
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
          restaurant: responseJSON.businesses,
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
  render() {
    const { navigate } = this.props.navigation
    const {restaurantID} = this.state
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ backgroundColor: '#c84343', }}>
          <Header
            leftComponent={
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Text style={styles.navBar}>Go Back</Text>
              </TouchableOpacity>
            }
            centerComponent={{
              text: 'Restaurants',
              style: {
                color: 'white', fontSize: 20,
                fontWeight: 'bold',
              }
            }}
            rightComponent={
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Text style={styles.navBar}>Done</Text>
              </TouchableOpacity>
            }
            outerContainerStyles={{ backgroundColor: '#c84343' }}
          />
        </SafeAreaView>
        <View style={{ alignSelf: 'center' }}><Text>Restaurant ID: {restaurantID}</Text></View>
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
  }
});
