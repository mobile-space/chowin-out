import React from 'react';
import { StyleSheet, View, Dimensions, Platform, ScrollView, Linking, flex, Button, WebView, TouchableOpacity, FlatList, Image, ActivityIndicator, Share } from 'react-native';
import {
  RkText,
  RkCard, RkStyleSheet, RkTheme,
} from 'react-native-ui-kitten';
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import { Rating, Tile } from 'react-native-elements'
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import API_KEYS from '../utils/config_keys';

export default class FoodDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Recipe',
    headerTintColor: 'white',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerStyle: { backgroundColor: '#c84343', borderBottomWidth: 0.5, borderBottomColor: '#aaaaaa', },
  });
  constructor(props) {
    super(props)
    const foodID = props.navigation.state.params && props.navigation.state.params.foodID
    console.log("Correct foodID: ", foodID)
    this.state = {
      isLoading: false,
      foodRecipe: null,
      API_URL: 'http://api.yummly.com',
      RES_SEARCH_URL: '/v1/api/recipe/',
      RECIPE_ID: foodID || null,
      APP_ID: API_KEYS[1].app_id,
      RES_SEARCH_URL1: '&_app_key=',
      API_KEY: API_KEYS[1].key,
      screen: null,
      description: '',
      check: false
    };
  }
  componentWillMount() {
    this._getYummlyRecipe()
  }
  async _getYummlyRecipe() {
    const { API_URL, RES_SEARCH_URL, APP_ID, API_KEY, RECIPE_ID, } = this.state;
    this.setState({ isLoading: true });

    try {
      let response = await fetch(`${API_URL}${RES_SEARCH_URL}${RECIPE_ID}?_app_id=${APP_ID}&_app_key=${API_KEY}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
        });

      let responseJSON = null

      if (response.status === 200) {
        responseJSON = await response.json();
        console.log("Preloaded", responseJSON)

        this.setState({
          isLoading: false,
          foodRecipe: responseJSON,
        })
        console.log(foodRecipe)
      } else {
        const error = responseJSON.message

        console.log(responseJSON)
        console.log(foodRecipe)
        this.setState({ errors: responseJSON.errors })
        // Alert.alert('Unable to get your feed', `Reason.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      // console.log(error)

      // Alert.alert('Unable to get the feed. Please try again later')
    }
  }
  recipeRender() {
    const { foodRecipe } = this.state
    const food = foodRecipe
    const { navigate } = this.props.navigation
    console.log("RecipeLoaded", food)
    const data = []
    food.nutritionEstimates.map((nutrition, index) => {
      nutrition.attribute === "FAT" &&
        data.push(
          {
            key: 1,
            amount: (nutrition.value / 0.65).toPrecision(2),
            svg: { fill: '#50EBC6' }
          }
        )
      nutrition.attribute === "CHOLE" &&
        data.push(
          {
            key: 2,
            amount: (nutrition.value / 0.003).toPrecision(2),
            svg: { fill: '#FFCA28' },
          },
        )
      nutrition.attribute === "NA" &&
        data.push(
          {
            key: 3,
            amount: (nutrition.value / 0.024).toPrecision(2),
            svg: { fill: '#304FFE' },
          },
        )
      nutrition.attribute === "K" &&
        data.push(
          {
            key: 4,
            amount: (nutrition.value / 0.047).toPrecision(2),
            svg: { fill: '#F57A82' },
          },
        )
      nutrition.attribute === "CHOCDF" &&
        data.push(
          {
            key: 5,
            amount: (nutrition.value / 3).toPrecision(2),
            svg: { fill: '#03A9F4' },
          },
        )
    })
    const Labels = ({ slices, height, width }) => {
      return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        return (
          <Text
            key={index}
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill={'white'}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={14}
            stroke={'white'}
            strokeWidth={0.2}
          >
            {data.amount}
          </Text>
        )
      })

    }


    let chartBlockStyles = [styles.chartBlock];

    return (

      <ScrollView style={styles.root}>
        <RkCard rkType='backImg'>
          <Tile
            imageSrc={{ uri: food.images[0].hostedLargeUrl }}
            title={food.name}
            titleStyle={styles.nameLabel}
            contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
            activeOpacity={1}
            captionStyle={styles.foodCaptionStyle}
            imageContainerStyle={styles.imageStyle}
            containerStyle={styles.imageContainer}

          >
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ height: 35 }}>
                <Rating
                  type="custom"
                  readonly
                  ratingColor='#FD9427'
                  startingValue={food.rating}
                  fractions={1}
                  imageSize={20}
                  style={{ marginVertical: 10 }}

                />
              </View>
              <TouchableOpacity onPress={() => {
                Share.share(
                  {
                    message: "I've found this recipe through Chowin-Out! " + (Platform.OS === 'ios' ? food.name : food.source.sourceRecipeUrl),
                    url: food.source.sourceRecipeUrl,
                    title: food.name
                  })
                  .then(result => console.log(result))
                  .catch(err => console.log(err));
              }}
                style={{ height: 35 }}>
                <Ionicons
                  name={Platform.OS === 'ios' ? 'ios-share-outline' : 'md-share'}
                  color={'#1ABC9C'}
                  size={Platform.OS === 'ios' ? 30 : 25}
                />
              </TouchableOpacity>
            </View>
          </Tile>
          <View rkCardHeader>
            <View>
              <RkText style={styles.title} rkType='large'>{"Ingredients:"}</RkText>

              <RkText rkType='large'></RkText>

              {food.ingredientLines.map((item, key) => (
                <RkText style={styles.ingText} rkType='medium' key={key} > {"• " + item} </RkText>)
              )}
            </View>
          </View>
          <View rkCardContent>

            <View style={chartBlockStyles}>

              <View style={styles.foodFact} >
                <RkText style={styles.title} rkType='xlarge'>{" Nutrition Facts:"}</RkText>
                <RkText style={styles.ingText} rkType='medium'> {'•  Number Of Servings: ' + food.numberOfServings}</RkText>
                {food.nutritionEstimates.map((nutrition, index) => (
                  <View key={index}>
                    <View>
                      {nutrition.attribute === "ENERC_KCAL" &&
                        <View>
                          <RkText style={styles.ingText} rkType='medium'> {'•  Calories: ' + nutrition.value + " " + nutrition.unit.abbreviation}</RkText>
                        </View>
                      }
                    </View>
                    <View>
                      {
                        nutrition.attribute === "PROCNT" &&
                        <View>
                          <RkText style={styles.ingText} rkType='medium'> {'•  Protein: ' + nutrition.value + nutrition.unit.abbreviation}</RkText>
                        </View>
                      }
                    </View>
                    <View>

                      {
                        nutrition.attribute === "FAT" &&
                        <View>
                          <RkText style={styles.foodTextOne} rkType='info'> {'•  Total Fat: ' + nutrition.value + nutrition.unit.abbreviation + ", " + "(" + (nutrition.value / 0.65).toPrecision(2) + "% DV)"}</RkText>
                        </View>
                      }
                    </View>
                    <View>

                      {nutrition.attribute === "CHOLE" &&
                        <View>
                          <RkText style={styles.foodTextTwo} rkType='info'> {'•  Cholesterol: ' + nutrition.value + nutrition.unit.abbreviation + ", " + "(" + (nutrition.value / 0.003).toPrecision(2) + "% DV)"}</RkText>
                        </View>
                      }
                    </View>
                    <View>
                      {nutrition.attribute === "NA" &&
                        <View>
                          <RkText style={styles.foodTextThree} rkType='info'> {'•  Sodium: ' + nutrition.value + nutrition.unit.abbreviation + ", " + "(" + (nutrition.value / 0.024).toPrecision(2) + "% DV)"}</RkText>

                        </View>
                      }
                    </View>
                    <View>
                      {nutrition.attribute === "K" &&
                        <View>
                          <RkText style={styles.foodTextFour} rkType='info'> {'•  Potassium: ' + nutrition.value + nutrition.unit.abbreviation + ", " + "(" + (nutrition.value / 0.047).toPrecision(2) + "% DV)"}</RkText>

                        </View>
                      }
                    </View>
                    <View>
                      {nutrition.attribute === "CHOCDF" &&
                        <View>
                          <RkText style={styles.foodTextFive} rkType='info'> {'•  Total Carbohydrate: ' + nutrition.value + nutrition.unit.abbreviation + ", " + "(" + (nutrition.value / 3).toPrecision(2) + "% DV)"}</RkText>
                        </View>
                      }
                    </View>
                  </View>
                ))}
                <RkText style={styles.title} rkType='xlarge'>{"% Daily Value Chart:"}</RkText>
                <PieChart
                  style={{ height: 225 }}
                  valueAccessor={({ item }) => item.amount}
                  data={data}
                  spacing={3}
                  outerRadius={'99%'}
                >
                  <Labels />

                </PieChart>
                <RkText style={{ paddingVertical: 10, color: '#aaa' }}>Note: Percent Daily Values are based on a 2,000 calorie diet. Your Daily Values may be higher or lower depending on your calorie needs.</RkText>
                <RkText style={{ color: '#aaa' }}>We don't guarantee the accuracy of that information.</RkText>
                <TouchableOpacity style={{paddingVertical: 10}} onPress={() => navigate('Recipe', { restaurantURL: food.attribution.url })}>
                    <RkText style={{color: 'black'}}>{food.attribution.text}</RkText>
                    <Image style={{height: 20, width: 60, resizeMode: 'contain'}}source={{uri: food.attribution.logo}}/>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
        </RkCard>

        <TouchableOpacity style={styles.recipieButton}
          onPress={() => navigate('Recipe', { restaurantURL: food.source.sourceRecipeUrl })}>
          <View style={styles.recipieButtonView}>
            <RkText style={styles.recipieText} rkType='medium'> View Recipe on {food.source.sourceDisplayName} website</RkText>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
  loadingView = () => {
    return (
      <LinearGradient colors={['#536976', '#292E49']} style={styles.loadingView}>
        <View style={styles.activityIndicatorAndButtonContainer}>
          <ActivityIndicator size="large" />
        </View>
      </LinearGradient>
    )
  }
  render() {
    const { isLoading } = this.state
    return (
      (isLoading ? this.loadingView() : this.recipeRender())

    );
  }
}

const padding = 0;
const { width } = Dimensions.get('window');

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  mainContainer: {
    flex: 1,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicatorAndButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: width / 1.1,
    width: '100%',
  },
  foodTitle: {
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold'
  },
  title: {
    marginBottom: 10,
    color: '#c84343'
  },
  title1: {
    marginBottom: 5,
    color: '#50EBC6',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1.5,
  },
  Image: {
    resizeMode: 'cover',
    height: (width - 0.8 * padding) / 1.4,

  },
  list: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  imageNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#000'
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#000'
  },
  flatListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  textNameContainer: {
    justifyContent: 'center',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1.5,

  },
  itemName: {
    justifyContent: 'center'
  },
  webViewButton: {
    justifyContent: 'flex-end'
  },
  foodFact: {
    flex: 1,
    marginTop: 12,
    justifyContent: 'center',
    alignContent: 'center',

  },
  ratingContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,

  },
  overlay: {
    justifyContent: 'flex-end',

  },
  foodTextOne: {
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1.5,
    marginBottom: 5,
    color: '#50EBC6',
  },
  foodTextTwo: {
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1.5,
    marginBottom: 5,
    color: '#FFCA28',
  },
  foodTextThree: {
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1.5,
    marginBottom: 5,
    color: '#304FFE',
  },
  foodTextFour: {
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1.5,
    marginBottom: 5,
    color: '#F57A82',
  },
  foodTextFive: {
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1.5,
    marginBottom: 5,
    color: '#03A9F4',
  },
  chartBlock: {
    marginBottom: 15,
    justifyContent: 'center',

  },
  foodLastText: {
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1.5,
    marginBottom: 20,
    color: '#304FFE'
  },
  ingText: {
    marginBottom: 5,
    color: '#000000',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1.5,
  },
  recipieButton: {
    height: 50,
    backgroundColor: '#1ABC9C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipieText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  recipieButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: 295,
    width: '100%',
  },
}));
