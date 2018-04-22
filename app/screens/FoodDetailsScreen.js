import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Platform, ScrollView, flex } from 'react-native';
import {
  RkText,
  RkCard, RkStyleSheet
} from 'react-native-ui-kitten';

import ProgressBar from 'react-native-progress/Bar';
import Image from 'react-native-image-progress';


export default class FoodDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Food Details',
    headerTintColor: 'white',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerStyle: { backgroundColor: '#c84343', borderBottomWidth: 0.5, borderBottomColor: '#aaaaaa', },

  });

  constructor(props){
    super(props);
   

    this.state = {
      screen: null,
      description: '',
    };
  }



  render() {

    const food = this.props.navigation.state.params.food;
    console.log(food);
    
    return (
      
  <ScrollView style={styles.root}>
        <RkCard  rkType='backImg'>
          {/* <Image style={styles.Image} rkCardImg source={{uri: food.image}}/>   */}
          <Image
              style={styles.image}
              source={{ uri: food.image }}
              indicator={ProgressBar} 
              indicatorProps={{
                size: 98,
                borderWidth: 1,
                color: 'rgb(200,67,67)',
                unfilledColor: 'rgba(200, 200, 200, 0.2)'
              }}
              style={{
                width: 390, 
                height: 240, 
                
              }}
            />

          <View rkCardHeader>
            <View>
              <RkText style={styles.title} rkType='xxlarge'>{food.name}</RkText>

              <RkText rkType='subtitle'>{'Calories: '+ food.calories}</RkText>
            </View>
              <RkText rkType='subtitle'>{'Ingredients: '+ food.ingredients}</RkText>
          </View>
          <View rkCardContent>
            <View>
              <RkText rkType='medium'>{food.description}</RkText>
            </View>
          </View>
        
        </RkCard>
      </ScrollView>


   
    );
  }
}


const padding = 0;
const { width } = Dimensions.get('window');

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5,
    color: 'red'
  },
  Image: {
     resizeMode: 'cover',
     height: (width - 0.8 * padding) / 1.4,

  },
 
 
}));