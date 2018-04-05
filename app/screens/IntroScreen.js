import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default class IntroScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'ChowinOut',
    headerTintColor: '#2F80ED',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerStyle: { backgroundColor: '#FAFAFA', borderBottomWidth: 0.5, borderBottomColor: '#aaaaaa', },
  });
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.mainContainer}>
        <View>
          <Text>This is IntroScreen</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigate('FoodNavigator')}
          >
            <Text style={styles.buttonLabel}>Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: '#aaaaaa',
    borderRadius: 10,
    height: 50,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel :{
    fontSize: 20,
  }
});
