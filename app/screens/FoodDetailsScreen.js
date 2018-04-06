import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class FoodDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Food Details',
    headerTintColor: 'white',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerStyle: { backgroundColor: '#ff9966', borderBottomWidth: 0.5, borderBottomColor: '#aaaaaa', },

  });
  render() {
    return (
      <View style={styles.container}>
        <Text>This is FoodDetailsScreen where information about food is displayed</Text>
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
});