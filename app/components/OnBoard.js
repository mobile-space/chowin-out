import { StyleSheet, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Alert, StatusBar } from 'react-native';
import React from 'react';
// Version can be specified in package.json
import Onboarding from 'react-native-onboarding-swiper'; 
import DISCOVER from '../../assets/discover.png'
import LOCATE from '../../assets/locate.png'
import FAV from '../../assets/favorite.png'
import CAMERA from '../../assets/camera1.png'
import RECIPIE from '../../assets/recipe.png'
import GIF from '../../assets/food.gif'

import {GeoLocation} from '../components/GeoLocation';




const OnBoard = ({navigation}) => (
    <Onboarding
      onSkip={() =>navigation.navigate('HomeTabs') }
      onDone={()  => navigation.navigate('HomeTabs') }
      pages={[
        {
          backgroundColor: '#03A9F4',
          image: <Image 
          source={DISCOVER}  style={styles.logo}/>,
          title: 'Discover new Food',
          subtitle: 'We will help you find delicious food :)',
        },
        
        {
          title: 'Locate Resturant',
          backgroundColor: '#2DCCE3',
          image: <Image source={LOCATE} style={styles.logo}/>,
          subtitle: 'We will help you find the nearest resturant',
        
        },

        {
          title: 'Favorite It',
          backgroundColor: '#33CCB1',
          image: <Image source={FAV} style={styles.logo}/>,
          subtitle: 'Save food to your favorite',
        },
        {
          title: 'Discover what is in your food',
          backgroundColor: '#50E3C1',
          image: <Image source={CAMERA}  style={styles.logo}/>,
          subtitle: 'Our smart camera analyzes the ingredients! :)',
        },

        {
          title: 'Get Recipe',
          backgroundColor: '#2DE394',
          image: <Image source={RECIPIE}  style={styles.logo}/>,
          subtitle: 'Learn new recipe and cook yourself',
        },

        {
          title: "Ready to Eat ?",
          subtitle: (
            <Button
              title={'Get Started'}
              containerViewStyle={{ marginTop: 20 }}
              backgroundColor={'#c84343'}
              borderRadius={5}
              textStyle={{ color: 'white' }}
              onPress={() => navigation.navigate('HomeTabs')}
  
            />
          ),
          backgroundColor: '#50E3C1',
          image: (
            <Image source={GIF} style={styles.logo}/>
          ),
        },
      ]}
    />
  );
  const styles = StyleSheet.create({
    logo: {
      resizeMode: 'contain',
      width: 250,
      height: 250,
    },
  });

  export default OnBoard;