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
    title: 'Restaurant',
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
        <View style={{alignSelf: 'center'}}><Text>This is RestaurantScreen</Text></View>
        
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
