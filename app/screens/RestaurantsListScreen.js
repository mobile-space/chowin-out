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
    headerStyle: { backgroundColor: '#ff9966', borderBottomWidth: 0.5, borderBottomColor: '#aaaaaa', },
  });
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <View style={{ alignSelf: 'center' }}><Text>This is RestaurantsScreen, here will be list of restaurants that offer clicked food</Text></View>
        <TouchableOpacity onPress={() => navigate('Restaurant')}>
          <Text style={{color: 'red'}}>Restaurant click</Text>
        </TouchableOpacity>
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
