import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Image
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

import { ENTRIES1 } from '../utils/food';

export default class FoodChooseScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      updatedFood: null,
    };
  }
  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            this.props.navigation.navigate('RestaurantsList', { foodName: item.title })
          }
        >
          <Image style={styles.images} source={{ uri: item.illustration }} />
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={{ backgroundColor: '#c84343', }}>
          <Header
            leftComponent={
              <TouchableOpacity>
                <Icon
                  name='filter-variant'
                  type='material-community'
                  size={25}
                  iconStyle={styles.navbarIcon}
                />
              </TouchableOpacity>
            }
            centerComponent={{
              text: 'Food',
              style: {
                color: 'white', fontSize: 20,
                fontWeight: 'bold',
              }
            }}
            rightComponent={
              <TouchableOpacity>
                <Icon
                  name='search'
                  type='feather'
                  size={25}
                  iconStyle={styles.navbarIcon}
                />
              </TouchableOpacity>
            }
            outerContainerStyles={{ backgroundColor: '#c84343' }}
          />
        </SafeAreaView>
        <View style={styles.imageContainer}>
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={ENTRIES1}
            renderItem={this._renderItem.bind(this)}
            sliderWidth={400}
            itemWidth={200}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbarIcon: {
    color: 'white',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  photoPostIcon: {
    color: 'pink',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  images: {
    width: "100%",
    height: 250,
    resizeMode: 'cover',
  }
});
