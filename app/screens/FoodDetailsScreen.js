import React from 'react';
import { StyleSheet, Text, View, Dimensions, Platform, ScrollView,Linking, flex , Button, WebView , TouchableOpacity, FlatList} from 'react-native';
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
    const food = this.props.navigation.state.params.food;

    this.state = {
      screen: null,
      description: '',
      check : false
    };
  }


  showWebView(){
    <WebView
    ref={(ref) => { this.webview = ref; }}
    source={{ uri: 'https://reactnativecode.com' }}
    onNavigationStateChange={(event) => {
      if (event.url !== uri) {
        this.webview.stopLoading();
        Linking.openURL(event.url);
      }
    }}
  />
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
  

  
  render() {

    const food = this.props.navigation.state.params.food;
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
                height: 260, 
                
              }}
            />

          <View rkCardHeader>
            <View>
              <RkText style={styles.title} rkType='xlarge'>{food.name}</RkText>

              <RkText rkType='subtitle'>{'Number Of Serving: '+ food.numberOfServings}</RkText>
            </View>
          </View>
          <View rkCardContent>
            <View>
              
              <RkText style={styles.title} rkType='large'>{"Ingredients"}</RkText>

              <RkText rkType='large'></RkText>

                  { food.ingredientLines.map((item, key)=>(
         <RkText rkType='medium' key={key} style={styles.textNameContainer}> { "- " + item } </RkText>)
         )}

            </View>
          </View>


        </RkCard>

        <View style = {styles.webViewButton}>
        <Button color= 'red' title='View Directions' 
        onPress={ ()=> Linking.openURL(food.source.sourceRecipeUrl) } />
        </View>

        {/* <FlatList
            style={styles.list}
            data={food}
            keyExtractor={(food, index) => index.toString()}
            renderItem={ ({item}) => this.renderItem(item)}

          /> */}

       
    
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

  },
  itemName : {
    justifyContent: 'center'
  },
  webViewButton : {
  justifyContent : 'flex-end'
  }
 
}));