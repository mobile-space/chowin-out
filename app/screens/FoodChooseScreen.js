import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Button, Icon } from 'react-native-elements';


export default class FoodChooseScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Food',
    headerTintColor: '#2F80ED',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    }
  });
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.mainContainer}>
        <View style={{ alignSelf: 'center', }}>
          <Text>This is FoodChooseScreen</Text>
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() => navigate('Restaurant')}
          >
            <Icon
              name='food'
              type='material-community'
              size={60}
              iconStyle={styles.photoPostIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <View>
            <TouchableOpacity>
              <Text>Left</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Text>Right</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center'
  },
  photoPostIcon: {
    color: 'pink',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
