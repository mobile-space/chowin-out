import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
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
        <Text>This is ProfileScreen</Text>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() => navigate('FoodDetails')}
          >
            <Text>Your favorite Food</Text>
            <Icon
              name='food'
              type='material-community'
              size={60}
              iconStyle={styles.photoPostIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  photoPostIcon: {
    color: '#ff9966',
  },
});