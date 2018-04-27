import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Platform,
  Dimensions,
  DeviceEventEmitter,
  Alert,
  FlatList,
  ScrollView,
  AsyncStorage
} from 'react-native';
import {
  RkText,
  RkCard, RkStyleSheet
} from 'react-native-ui-kitten';
import { Icon, Header, Button } from 'react-native-elements';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import FavCard from '../components/FavCard';
import StarRating from 'react-native-star-rating';


import AppProvider, { AppContext } from '../components/AppProvider';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
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
      imagesLoaded: false,
      foodImages: null,
      foodId:'',

    };



    // const {foodID} = this.props;
  }

  
  componentDidMount() {
    //When the component is loaded
    this._getYummlyImages()
    // this.displayAsyncData()
  }

  
  // displayAsyncData = async() =>{
    
  //  try{
  //   const foodId = await AsyncStorage.getItem('foodId');
  //   this.setState({foodId : foodId})
  //   // alert(foodId)
   
  //  }catch(error){
  //    alert(error)
  //  }
  // }

  loadingImages = () => {
    return (
      <LinearGradient colors={['#536976', '#292E49']} style={styles.loadingView}>
        <View style={styles.activityIndicatorAndButtonContainer}>
          <ActivityIndicator size="large" />
        </View>
      </LinearGradient>
    )
  }


  async _getYummlyImages() {
    const { search, picture } = this.state;

    this.setState({ imagesLoaded: true })



    try {

      const foodId = await AsyncStorage.getItem('foodId');
      let response = await fetch(`http://api.yummly.com/v1/api/recipe/${foodId}?_app_id=eb4e23c7&_app_key=851038fb4920d6b523e47c79320c858e`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
        });

      let responseJSON = null

      if (response.status === 200) {

        responseJSON = await response.json();
        console.log("Loaded food", responseJSON)

        this.setState({
          imagesLoaded: false,
          foodImages: responseJSON,
        })
        // console.log(imagesLoaded)
        console.log("not loaded food",foodImages)
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)
        console.log(imagesLoaded)
        this.setState({ errors: responseJSON.errors })
        // Alert.alert('Unable to get your feed', `Reason.. ${error}!`)
      }
    } catch (error) {
      this.setState({ imagesLoaded: false, response: error })

      console.log(error)

      // Alert.alert('Unable to get the feed. Please try again later')
    }
  }

  _renderItem({ item, index }) {
    if(item){
    return (
      <FavCard
        item={item}
        navigation={this.props.navigation}
      />
    );
  }
  }




  contentView = () => {
    const { foodImages, imagesLoaded, foodID } = this.state
    const { navigate } = this.props.navigation
    // console.log(foodImages )
    return (
      <View style={styles.mainContainer}>
        <LinearGradient colors={['#000000', '#292E49']} style={{ height: headerHeight }}>
       
       <View style={styles.foodInfo1}>
       
        <Text style= {styles.foodTitle}> Your Favorite List  </Text>
        
    
      </View> 
 
      </LinearGradient>


        {foodImages === null ?
              this.loadingImages() :
              <LinearGradient colors={['#000000', '#292E49']} style={styles.mainContainer}>
          <View style={styles.imageContainer}>
          {/* { console.log("in content view: " + foodImages)} */}

              {/* <FlatList
                data={foodImages}
                keyExtractor={(foodImages, index) => index.toString()}
                renderItem={this._renderItem.bind(this)}
                style={styles.carouselContainer}

              /> */}

             <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            this.props.navigation.navigate('FoodDetails',{food: foodImages }
           )
          }
          >       
          <ScrollView style={styles.root}>
              <RkCard  rkType='backImg'>
          <Image
              style={styles.image}
              source={{ uri: foodImages.images[0].hostedLargeUrl }}
              style={{
                width: '100%', 
                height: 295, 
                
              }}
              
            />
              <View rkCardImgOverlay rkCardContent style={styles.overlay}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={foodImages.rating}
                starSize={22}
                fullStarColor={'#FDD835'}
      />
              <RkText style={styles.foodTitle} rkType='large'>{foodImages.name}</RkText>
               
               </View>
              </RkCard>
              </ScrollView>

             
            </TouchableOpacity>  


        
          </View>
 </LinearGradient>
        }


      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const { imagesLoaded } = this.state


    return (
      
      (imagesLoaded ? this.loadingImages() : this.contentView())


    )
  }
}

const padding = 4;
const headerHeight = 50;

const styles = StyleSheet.create({
  root: {

  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  navbarIcon: {
    color: 'white',
  },

  imageContainer: {
    flex: 1,
    justifyContent : 'flex-start'

  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  images: {
    width: "100%",
    height: 240,
    resizeMode: 'cover',
    justifyContent : 'flex-start'
  },
  flatListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  itemName : {
    justifyContent: 'center',
  }
  ,foodInfo: {

    marginRight : '25%',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? -2 : 1,

  },
  foodName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',

  },

  foodTitle: {
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
   

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
  foodInfo1: {
    alignContent: 'center',
    justifyContent: 'center',
    height: 45,
  },
  overlay: {
    justifyContent: 'flex-end',

  },

 

  
});
