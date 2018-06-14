import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Alert, ImageEditor, ImageStore, Dimensions, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { ImagePicker, LinearGradient } from 'expo';
import { Entypo, Ionicons } from '@expo/vector-icons';
import Clarifai from 'clarifai'
import API_KEYS from '../utils/config_keys';

const { width } = Dimensions.get('window');
console.ignoredYellowBox = ["Warning: Can't call setState",];
import CLARIFAI_LOGO from '../../assets/clarifai_logo2.png';


export default class RecognitionResultScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Ingredients',
    headerTintColor: 'white',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerStyle: { backgroundColor: '#c84343', borderBottomWidth: 0.5, borderBottomColor: '#aaaaaa', },
  });
  constructor(props) {
    super(props)
    const foodImage = props.navigation.state.params && props.navigation.state.params.foodImage
    this.state = {
      isLoading: false,
      foodImage: foodImage || null,
      prediction: null,
      ingredientsList: null,
    };
  }
  componentWillMount() {
    process.nextTick = setImmediate;
    this.clarifaiCall()
  }

  async clarifaiCall() {
    this.setState({ isLoading: true })
    const { foodImage } = this.state
    // console.log(foodImage)



    const Clarifai = require('clarifai');
    let responseJSON = null;
    let ingredients = []

    const app = new Clarifai.App({ apiKey: API_KEYS[0].key });
    app.models.predict(Clarifai.FOOD_MODEL, { base64: foodImage.base64 }).then(
      async response => {
        // do something with response
        console.log(response)
        responseJSON = response
        // console.log("should be object ", responseJSON)
        responseJSON.outputs[0].data.concepts.map((ingredient, index) => {
          {ingredient.value > 0.85 && ingredients.push(ingredient.name)} 
        })
        this.setState({
          isLoading: false,
          prediction: responseJSON.outputs[0],
          ingredientsList: ingredients

        })

      },
      function (err) {
        // there was an error
        console.log(err)
        Alert.alert('Unable to get you food ingredients', `Reason.. ${err.status.description}!`)

      }
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

  displayValue(ingredient, index) {
    return (
      <View key={index}>
        {ingredient.value > 0.05 &&
          <View style={styles.predictionInfoContainer}>
            <View>
              <Text style={styles.ingredientLabel}>{ingredient.name}</Text>
            </View>
            <View>
              <Text style={styles.percentLabel}>{(ingredient.value * 100).toPrecision(3)}</Text>
            </View>
          </View>
        }
      </View>

    )
  }
  renderPrediction(){
    const { prediction } = this.state

    return (
      <View>
        <View style={styles.predictionTableContainer}>
          <Text style={styles.predictionTableLabel}>PREDICTED INGREDIENT</Text>
          <Text style={styles.predictionTableLabel}>ACCURACY %</Text>
        </View>
        {
          prediction.data.concepts.map((ingredient, index) => {
            return this.displayValue(ingredient, index)
          })
          
        }

      </View>
    )

  }
  predictionResult(){
    const { prediction, isLoading, ingredientsList } = this.state
    console.log("IngredientsList", ingredientsList)

    let { foodImage } = this.state;
    return (
      <ScrollView style={styles.container}>
        {foodImage &&
          <View style={styles.imageContainer}><Image source={{ uri: foodImage.uri }} style={styles.imageStyle} /></View>}
        <View style={styles.predictionContainer}>
          {this.renderPrediction()}
        </View>
        <View style={styles.clarifaiLogoContainer}>
              <Image style={styles.clarifaiLogo} source={CLARIFAI_LOGO}></Image>
        </View>
        <Button
          title={'Find a Recipe!'}
          containerViewStyle={{ marginVertical: 10, alignItems: 'center' }}
          textStyle={{ color: 'white', fontWeight: 'bold' }}
          buttonStyle={{
            backgroundColor: '#1ABC9C',
            width: 200,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5,
          }}
          onPress={() => this.props.navigation.navigate('FoodList', {ingredientsList: ingredientsList})}
        />
      </ScrollView>
    );
  }
  render() {
    const { prediction, isLoading } = this.state
    console.log(isLoading)
    return (
      (isLoading ? this.loadingView() : this.predictionResult())
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  predictionContainer: {
    // flex: 1,
  },
  predictionInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#aaaaaa',
    marginBottom: 10,
  },
  predictionTableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  predictionTableLabel: {
    color: '#B4B7BA',
    fontSize: 14,
  },
  ingredientLabel: {
    fontSize: 18,
    color: '#2E4A62',
    fontWeight: 'bold'
  },
  percentLabel: {
    fontSize: 18,
    color: '#2E4A62'
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  imageStyle: {
    height: width / 1.5,
    width: width/ 1.2, 
    borderRadius: 25,
  },
  clarifaiLogoContainer: {
    alignItems: 'center',

  },
  clarifaiLogo: {
    height: 60,
    width: 100,
    resizeMode: 'contain',
  }
});
