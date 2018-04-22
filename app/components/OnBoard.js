import { StyleSheet, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Alert, StatusBar } from 'react-native';
import React from 'react';
// Version can be specified in package.json
import Onboarding from 'react-native-onboarding-swiper'; 
import DISCOVER from '../../assets/discover.png'
import LOCATE from '../../assets/locate.png'
import FAV from '../../assets/favorite.png'
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
          backgroundColor: '#00796B',
          image: <Image source={LOCATE} style={styles.logo}/>,
          subtitle: 'We will help you find the nearest resturant',
        
        }
        ,
        {
          title: 'Get Recipe',
          backgroundColor: '#8BC34A',
          image: <Image source={RECIPIE}  style={styles.logo}/>,
          subtitle: 'Learn new recipe and cook yourself',
        },
  
        {
          title: 'Favorite It',
          backgroundColor: '#D32F2F',
          image: <Image source={FAV} style={styles.logo}/>,
          subtitle: 'Save food to your favorite',
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
          backgroundColor: 'white',
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