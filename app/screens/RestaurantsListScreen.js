import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Button, Input, Header } from 'react-native-elements'


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
        // method: 'both',
        term: foodName || null,
        latitude: '37.785834',
        longitude: '-122.406417',
        location: 'san francisco, ca',
        radius: '9000'
      }
    }
    async _fetchRestaurants() {
      const { API_KEY, RES_SEARCH_URL, API_URL, term, location, longitude, latitude, radius } = this.state
  
      this.setState({ isLoading: true })
      try {
        const response = await fetch(`${API_URL}${RES_SEARCH_URL}?term=${term}&latitude=${latitude}&longitude=${longitude}&radius=${radius}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
          }
        });
        // console.log(response)
        const responseJSON = await response.json();
        if (response.status === 200) {
          console.log(responseJSON)
          const { businesses, total } = responseJSON
          console.log("Restaurants length:", total)
          console.log("Restaurants", businesses)
  
        } else {
          const error = responseJSON.details
          // console.log("Server request failed " + error);
        }
      } catch (error) {
        console.log("Server is down " + error);
      }
    }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <View style={{ alignSelf: 'center' }}><Text>This is RestaurantsScreen, here will be list of restaurants that offer clicked food</Text></View>
        <TouchableOpacity onPress={() => navigate('Restaurant')}>
          <Text style={{color: 'red'}}>Restaurant click</Text>
        </TouchableOpacity>
        <Button
          title='SEARCH'
          buttonStyle={{
            paddingHorizontal: 5
          }}
          onPress={() => this._fetchRestaurants()}
        />
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
