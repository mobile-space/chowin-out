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
} from 'react-native';
import { Icon, Header, Button } from 'react-native-elements';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';

export default class FavCard extends React.Component{
  constructor(props) {
    super(props);

    const { item } = props;

    this.state = {
      isFavorited: false,
    };
  }
  

  
  // renderImage(item) {
  //   var urlImage = item.replace(/=s90-c/i, "=s1080")
 
  //   // console.log(urlImage)
  //   return (
  //     <Image style={styles.images} source={ {uri: urlImage}} />
  //   )
  // }
  render = () => {
    const { item } = this.props;
    const { navigate } = this.props.navigation
    // console.log(item.id)
    console.log("name should be here"+item )
    return (
      <View style={styles.slide}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            this.props.navigation.navigate('FoodDetails', 
           )
          }
        >
          {/* {this.renderImage(item.images[0].hostedLargeUrl)} */}
          

          <View style={styles.foodInfo}>
            <Text style={styles.foodName} numberOfLines={2}>
              {item.name}
              {conole.log("in favCard: " + item.name)}
            </Text>
          </View>


        </TouchableOpacity>
      </View>
    );
  };

}

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
  },

  images: {
    width: "100%",
    height: 240,
    resizeMode: 'cover',
  },



  foodInfo: {
  
    // marginRight: '55%',
    // position: 'absolute',
    // bottom: Platform.OS === 'ios' ? -1 : 1,
    // alignSelf: 'center',
  },
  foodName: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',

  },
  buttonContainer: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 56,
    paddingRight: 0,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 55 : 30,
    right: 0,

  },
});




/**
 * 
 *  const itemId = item.id;
   AsyncStorage.setItem('foodId', itemId);
 */