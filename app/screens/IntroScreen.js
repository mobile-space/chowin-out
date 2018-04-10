import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo';

export default class IntroScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    const { navigate } = this.props.navigation
    return (
      <LinearGradient colors={['#ff9966', '#F2C94C']} style={styles.mainContainer}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
        <View>
          <Text>This is IntroScreen, here should be animations</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigate('HomeTabs')}
          >
            <Text style={styles.buttonLabel}>Start your food journey</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
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
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 20,
    color: 'white'
  }
});
