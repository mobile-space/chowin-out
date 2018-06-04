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
  AsyncStorage,
} from 'react-native';
import {
  RkText,
  RkCard,
  RkStyleSheet
} from 'react-native-ui-kitten';
import { Button, Icon, Rating } from 'react-native-elements';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import FavCard from '../components/FavCard';
import API_KEYS from '../utils/config_keys';


export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Saved Recipes',
    headerTintColor: 'white',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerStyle: { backgroundColor: '#c84343', borderBottomWidth: 0.5, borderBottomColor: '#aaaaaa', },
  });
  constructor(props) {
    super(props);

    this.state = {
      foodRecipe: null,
      foodId: '',
      isLoading: false,
      foodRecipe: null,
      API_URL: 'http://api.yummly.com',
      RES_SEARCH_URL: '/v1/api/recipe/',
      APP_ID: API_KEYS[1].app_id,
      RES_SEARCH_URL1: '&_app_key=',
      API_KEY: API_KEYS[1].key,
      parsedIds: null,

    };
    // const {foodID} = this.props;
  }
  componentDidMount() {
    this.displayAsyncData()
  }
  componentWillMount() {
    //When the component is loaded
    DeviceEventEmitter.addListener('new_food_liked', (e) => {
      this.displayAsyncData()
    })
    // this._getYummlyRecipe()
  }
  displayAsyncData = async () => {
    const foodId = await AsyncStorage.getItem('foodIds');
    const parsed = JSON.parse(foodId)
    console.log("ids should be", parsed)
    this.setState({
      parsedIds: parsed,
    })
    const fetched_data = []
    if (parsed != null) {
      for (let i = 0; i < parsed.length; i++) {
        await this._getYummlyRecipe(parsed[i])
          .then(yummlyImage => {
            if (yummlyImage) {
              fetched_data.push(yummlyImage)
            }
          })
        this.setState({
          fetchedData: true,
          foodRecipe: fetched_data
        })
      }
    } else {
      Alert.alert(
        "Welcome to our app!",
        "Start from the Food tab and come back here when you like new food."
      )
    }

    this.setState({
      isLoading: false,
    })
    console.log("list of items", fetched_data)

  }
  async _getYummlyRecipe(recipeId) {
    const { API_URL, RES_SEARCH_URL, APP_ID, API_KEY, } = this.state;
    this.setState({ isLoading: true });
    let responseJSON = null

    try {
      // const foodId = await AsyncStorage.getItem('foodId');

      let response = await fetch(`${API_URL}${RES_SEARCH_URL}${recipeId.foodId}?_app_id=${APP_ID}&_app_key=${API_KEY}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
        });


      if (response.status === 200) {
        responseJSON = await response.json();
        // console.log("Loaded food for saved list", responseJSON)

        // this.setState({
        //   isLoading: false,
        //   foodRecipe: responseJSON,
        // })
        // console.log(foodRecipe)
      } else {
        const error = responseJSON.message

        console.log(responseJSON)
        // console.log(foodRecipe)
        this.setState({ errors: responseJSON.errors })
        // Alert.alert('Unable to get your feed', `Reason.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })
      // console.log(error)

      // Alert.alert('Unable to get the feed. Please try again later')
    }
    return responseJSON;

  }

  _renderItem({ item, index }) {
    if (item) {
      return (
        <FavCard
          item={item}
          navigation={this.props.navigation}
        />
      );
    }
  }

  loadingImages() {
    return (
      <LinearGradient colors={['#536976', '#292E49']} style={styles.loadingView}>
        <View style={styles.activityIndicatorAndButtonContainer}>
          <ActivityIndicator size="large" />
        </View>
      </LinearGradient>
    )
  }
  contentView() {
    const { foodRecipe, isLoading, foodID } = this.state
    const { navigate } = this.props.navigation
    // console.log(foodRecipe )
    return (
      <View style={styles.mainContainer}>
        <LinearGradient colors={['#000000', '#292E49']} style={{ height: headerHeight }}>

          <View style={styles.foodInfo1}>

            <Text style={styles.foodTitle}> Your Favorite List  </Text>


          </View>

        </LinearGradient>


        {foodRecipe === null ?
          this.loadingImages() :
          <LinearGradient colors={['#000000', '#292E49']} style={styles.mainContainer}>
            <View style={styles.imageContainer}>
              {/* { console.log("in content view: " + foodRecipe)} */}

              <FlatList
                data={foodRecipe}
                keyExtractor={(foodRecipe, index) => index.toString()}
                renderItem={this._renderItem.bind(this)}
                style={styles.carouselContainer}

              />
            </View>
          </LinearGradient>
        }


      </View>
    );
  }
  render() {
    const { navigate } = this.props.navigation;
    const { isLoading } = this.state
    return (
      (isLoading ? this.loadingImages() : this.contentView())
    );
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
    justifyContent: 'flex-start'

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
    justifyContent: 'flex-start'
  },
  flatListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  itemName: {
    justifyContent: 'center',
  }
  , foodInfo: {

    marginRight: '25%',
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
