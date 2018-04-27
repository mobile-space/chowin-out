import React, { Component } from 'react';
import { WebView, View, SafeAreaView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button, Header, Icon, } from 'react-native-elements'

class RecipeWebView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Recipie',
    headerTintColor: 'white',
    headerTitleStyle: { 
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerStyle: { backgroundColor: '#c84343', borderBottomWidth: 0.5, borderBottomColor: '#aaaaaa', },

  });
  constructor(props) {
    super(props)
    const restaurantURL = props.navigation.state.params && props.navigation.state.params.restaurantURL
    // console.log("Correct restaurantURL: " + restaurantURL)
    this.state = {
      restaurantURL: restaurantURL || null,
    };
  }

  render() {
    const { restaurantURL } = this.state
    return (
      <View style={{ height: '100%', }}>
        {/* <SafeAreaView style={{ backgroundColor: '#c84343', }}>
          <Header
            leftComponent={
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Text style={styles.navBar}>Close</Text>
              </TouchableOpacity>
            }
            centerComponent={{
              text: 'Recipie',
              style: {
                color: 'white', fontSize: 20,
                fontWeight: 'bold',
              }
            }}
            outerContainerStyles={{ backgroundColor: '#c84343' }}
          />
        </SafeAreaView> */}
        <WebView
          source={{ uri: restaurantURL }}
          scalesPageToFit
          automaticallyAdjustContentInsets={true}
          allowsInlineMediaPlayback={true}
        />
      </View>

    );
  }
}

export default RecipeWebView ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    color: 'white'
  },
});
