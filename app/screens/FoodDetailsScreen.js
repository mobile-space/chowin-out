import React from 'react';
import { StyleSheet, View, Dimensions, Platform, ScrollView,Linking, flex , Button, WebView , TouchableOpacity, FlatList} from 'react-native';
import {
  RkText,
  RkCard, RkStyleSheet,RkTheme,
} from 'react-native-ui-kitten';
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import ProgressBar from 'react-native-progress/Bar';
import Image from 'react-native-image-progress';
import { Rating } from 'react-native-elements'
import StarRating from 'react-native-star-rating';





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
    const food = this.props.navigation.state.params.food;

    this.state = {
      screen: null,
      description: '',
      check : false
    };
  }





  displayIng(){
    const food = this.props.navigation.state.params.food;
    for (let i = 0; i < 10; i++) {

    var str = food.ingredientLines
    var res = str.toString().replace(",", "\n");
    {console.log("flatList data prased: " + res)}


    }

  }

  SampleFunction=(item)=>{
 
    Alert.alert(item);
 
  }

//   searchProtein(){
//     const food = this.props.navigation.state.params.food;
//    var results = [];
//    var searchField = "name";
//    var searchVal = "calorie";
//   for (var i=0 ; i < 50 ; i++)
//    {
//     if (food.list[i][searchField] == searchVal) {
//         results.push(food.list[i]);
//         console.log("searchProtein: "+ results)
//     }
//   }
   
// }
  

  
  render() {
    const food = this.props.navigation.state.params.food;
    const { navigate } = this.props.navigation

    const data = [
      {
          key: 1,
          amount: 108,
          svg: { fill: '#FFCA28' },
      },
      {
          key: 2,
          amount: 70,
          svg: { fill: '#304FFE' }
      },
      {
          key: 3,
          amount: 7,
          svg: { fill: '#03A9F4' }
      },
      {
          key: 4,
          amount: 400,
          svg: { fill: '#1B5E20' }
      },
      {
        key: 5,
        amount: food.numberOfServings,
        svg: { fill: '#000000' }
    },

      
     
  ]
  const Labels = ({ slices, height, width }) => {
    return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        return (
            <Text
                key={index}
                x={pieCentroid[ 0 ]}
                y={pieCentroid[ 1 ]}
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
        <RkCard  rkType='backImg'>
          <Image
              style={styles.image}
              source={{ uri: food.images[0].hostedLargeUrl }}
              indicator={ProgressBar} 
              indicatorProps={{
                size: 98,
                borderWidth: 1,
                color: 'rgb(200,67,67)',
                unfilledColor: 'rgba(200, 200, 200, 0.2)'
              }}
              style={{
                width: '100%', 
                height: 295, 
                
              }}
              
            />
              <View rkCardImgOverlay rkCardContent style={styles.overlay}>
              <StarRating
        disabled={false}
        maxStars={5}
        rating={food.rating}
        starSize={22}
        fullStarColor={'#FDD835'}
      />
              <RkText style={styles.foodTitle} rkType='large'>{food.name}</RkText>
               
               </View>
              

           

          <View rkCardHeader>
            <View>
              <RkText style={styles.title} rkType='large'>{"Ingredients:"}</RkText>

              <RkText rkType='large'></RkText>

                  { food.ingredientLines.map((item, key)=>(
         <RkText style={styles.ingText} rkType='medium' key={key} > { "• " + item } </RkText>)
         )}
            </View>
          </View>
          <View rkCardContent>
            
          <View style={chartBlockStyles}>

            <View style = {styles.foodFact} >
            <RkText style={styles.title} rkType='xlarge'>{" Nutrition Facts:"}</RkText>
            <RkText style={styles.ingText} rkType='medium'> {'•  Number Of Servings: '+food.numberOfServings}</RkText>
            <RkText style={styles.title1} > {'•  Calories/Serving: 400'}</RkText>
            <RkText style={styles.foodText} rkType='info'> {'•  Protein: 7 '}</RkText>
            <RkText style={styles.foodText} rkType='warning'> {'•  Carbs: 108' }</RkText>
            <RkText style={styles.foodLastText} > {'•  Fat: 70'}</RkText>
        

             <PieChart
                style={{ height: 225 }}
                valueAccessor={({ item }) => item.amount}
                data={data}
                spacing={3}
                outerRadius={'99%'}
            >
              <Labels/>

            </PieChart>

            

         
              </View>


            </View>
          </View>


        </RkCard>
    

      
        <TouchableOpacity  style = {styles.recipieButton}
        onPress={() => navigate('Recipe', { restaurantURL: food.source.sourceRecipeUrl})}>
        <View style = {styles.recipieButtonView}>
        <RkText style={styles.recipieText} rkType='medium'> View Recipe </RkText>
        </View>
        </TouchableOpacity>



       
    
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
  foodTitle:{
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
    color: '#1B5E20',
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
    borderColor:'#000'
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    borderBottomWidth: 1,
    borderColor:'#000'
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
  itemName : {
    justifyContent: 'center'
  },
  webViewButton : {
  justifyContent : 'flex-end'
  },
  foodFact : {
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
  foodText : {
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1.5,
    marginBottom: 5,
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
    height:50,
    backgroundColor: '#c84343',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipieText:{
    fontSize: 20,
    fontWeight:'bold',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipieButtonView:{
    justifyContent: 'center',
    alignItems: 'center',
  }

 
}));