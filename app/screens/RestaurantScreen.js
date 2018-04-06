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
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ backgroundColor: '#ff9966', }}>
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
              <TouchableOpacity onPress={() => navigate("IntroStack")}>
                <Text style={styles.navBar}>Done</Text>
              </TouchableOpacity>
            }
            outerContainerStyles={{ backgroundColor: '#ff9966' }}
          />
        </SafeAreaView>
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
