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
  AsyncStorage,
  Alert,
} from 'react-native';
import { Icon, Header, Button } from 'react-native-elements';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { LinearGradient } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';

export default class FavCard extends React.Component {
  constructor(props) {
    super(props);

    const { item } = props;

    this.state = {
      isFavorited: false,
    };
  }

  _showAlert = () => {
    Alert.alert(
      'Warning',
      'Are you sure you want to remove this food from your list?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => {console.log('Yes Pressed'), this.onRemoveButtonPress()}},
      ],
      { cancelable: false }
    )
  }


  onRemoveButtonPress = async () => {
    const { item } = this.props;
    
      try {
        const posts = await AsyncStorage.getItem('foodIds');
        let postsFav = JSON.parse(posts);
        const postsItems = postsFav.filter(function(e){ return e.foodId !== item.id });
      
        // updating 'posts' with the updated 'postsItems'
        await AsyncStorage.setItem('foodIds', JSON.stringify(postsItems));
        DeviceEventEmitter.emit('new_food_liked', {})

      } catch(error) {
        alert(error)
        console.log('error: ', error);
      };

  }

  renderRemoveButton = () => {
    const { item } = this.props;

    return (
      <TouchableOpacity onPress={this._showAlert}>
        <MaterialIcons
          name={'delete-forever'}
          color={'white'} size={35}

        />
      </TouchableOpacity>
    );

  }
  renderImage(item) {
    var urlImage = item.replace(/=s90-c/i, "=s1080")

    // console.log(urlImage)
    return (
      <Image style={styles.images} source={{ uri: urlImage }} />
    )
  }
  render = () => {
    const { item } = this.props;
    const { navigate } = this.props.navigation
    // console.log(item.id)
    return (
      <View style={styles.slide}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            this.props.navigation.navigate('FoodDetails', { foodID: item.id }
            )
          }
        >
          {this.renderImage(item.images[0].hostedLargeUrl)}


          <View style={styles.foodInfo}>
            <Text style={styles.foodName} numberOfLines={2}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          {this.renderRemoveButton()}
        </View>
      </View>
    );
  };

}
const padding = 0;
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
  },

  images: {
    width: "100%",
    height: 240,
    resizeMode: 'cover',
  },



  slide: {
    flex: 1,
  },
  foodName: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',

  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    height: 56,
    paddingRight: 0,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? width/15 : width/14,
    right: padding,
  },
});