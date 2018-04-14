import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';


export default class FoodChooseScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Food',
  };
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
        <View style={{ alignSelf: 'center', }}>
          <Text>This is FoodChooseScreen</Text>
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() => navigate('RestaurantsList')}
          >
            <Icon
              name='food'
              type='material-community'
              size={60}
              iconStyle={styles.photoPostIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <View>
            <TouchableOpacity>
              <Text>Left</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Text>Right</Text>
            </TouchableOpacity>
          </View>
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
    flex: 2,
    justifyContent: 'center'
  },
  photoPostIcon: {
    color: 'pink',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
