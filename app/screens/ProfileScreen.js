import React, { Component } from 'react';
import { StyleSheet, View, Alert,Text, FlatList,Platform, DeviceEventEmitter, ActivityIndicator, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';


import FavCard from '../components/FavCard';

const DATA = require('../../assets/data.json');

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Cook & Eat',
    headerTintColor: 'white',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    }, 
    headerStyle: { backgroundColor: '#c84343', borderBottomWidth: 0.5, borderBottomColor: 'white', },
  });
  
  constructor(props) {
    super(props);
    this.state = {
      food: DATA.food,
      posts: null,
      updatedFood: null,
      isLoading: false,

      API_URL: 'http://api.yummly.com',
      RES_SEARCH_URL: '/v1/api/recipes?_app_id=',
      APP_ID:'eb4e23c7',
      RES_SEARCH_URL1: '&_app_key=',
      API_KEY: '851038fb4920d6b523e47c79320c858e',
      search: '&q=pork',
      picture: '&requirePictures=true'

    };
  }

  // ${API_URL}${RES_SEARCH_URL}
  //      ${APP_ID}${RES_SEARCH_URL1}${API_KEY}${search}`

  // componentWillMount() {
  //   DeviceEventEmitter.addListener('setFoodUpdated', ({ updatedFood }) => {
  //     this.foodUpdated({ updatedFood });
      
  //   });
  // }

  async getFeed() {
    const {search, picture} = this.state;
    this.setState({ isFeedLoading: true });
    
  
    try {
      let response = await fetch(`http://api.yummly.com/v1/api/recipes?_app_id=eb4e23c7&_app_key=851038fb4920d6b523e47c79320c858e&${search}${picture}`,
       {
        method: 'GET',
        data: {
          minRow: 1,
          maxRow: 1
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
      });

      let responseJSON = null

      if (response.status === 200) {

        responseJSON = await response.json();
        console.log(responseJSON)

        //save the posts 
        this.setState({
          isFeedLoading: false,
          posts: responseJSON,
        })
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ errors: responseJSON.errors })
        Alert.alert('Unable to get your feed', `Reason.. ${error}!`)
      }
    } catch (error) {
        this.setState({ isLoading: false, response: error })
  
        console.log(error)
  
        Alert.alert('Unable to get the feed. Please try again later')
      }
    }

    _renderImage = (image) => {
      // render big image
      if(image){
        return(
          <Image
          source = {{uri: image}} 
          style = {{
             width: "100%",
             height: 400,
          }}
       />
       )
      }

    }


  loadingView() {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  renderFood = ({ item: food, index }) => {
     
    return (
        <FavCard
          food={food}
          navigation={this.props.navigation}
        />

        
      );
  };



  render() {
    const { isLoading,posts, food } = this.state
    
    return (
      <View style={styles.mainContent}  >

       <TouchableOpacity
         onPress={() => this.getFeed()}
       >
       <LinearGradient colors={['#000000', '#434343']} style={styles.mainContainer}>
       
       <View style={styles.foodInfo}>
       
        <Text style= {styles.foodTitle}> Your Favorite List  </Text>
        
    
      </View> 
 
      </LinearGradient>
      </TouchableOpacity>
      


      <FlatList
         data={food}
        // data={posts}
        keyExtractor={(food, index) => index.toString()}
        renderItem={this.renderFood}
      />



      </View>
    );
  }
}

const padding = 4;
const headerHeight = 60;

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
  },
  foodInfo: {
    alignContent: 'center',
    justifyContent: 'center',
    height: 55,
  },
  foodTitle: {
    color: 'white',
    fontWeight: '200',
    fontSize: 28,

  },

  header: {
    padding,
    height: headerHeight,
    position: 'absolute',
  },
  headerBackground: {
    backgroundColor: '#ff9966',
    height: headerHeight * 1.6,
    zIndex: -1000,
  },
  introText: {
    fontWeight: '100',
    fontSize: 26,
    color: '#FFF',
    
  },
  locationContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
});

