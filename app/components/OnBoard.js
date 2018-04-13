import { Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Alert, StatusBar } from 'react-native';
import React from 'react';
// Version can be specified in package.json
import Onboarding from 'react-native-onboarding-swiper'; 
import DISCOVER from '../../assets/discover.png'
import LOCATE from '../../assets/locate.png'
import FAV from '../../assets/favorite.png'
import RECIPIE from '../../assets/recipe.png'

const OnBoard = ({navigation}) => (
    <Onboarding
       onSkip={() =>navigation.navigate('HomeTabs') }
      pages={[
        {
          backgroundColor: 'black',
          image: <Image 
          source={DISCOVER}  />,
          title: 'Discover new Food',
          subtitle: 'We will help you find delicious food :)',
        },
        
        {
         
          title: 'Locate Resturant',
          backgroundColor: '#00796B',
          image: <Image source={LOCATE} />,
          subtitle: 'We will help you find the nearest resturant',
        
        }
      
        ,
  
        {
          title: 'Get Recipe',
          backgroundColor: '#8BC34A',
          image: <Image source={RECIPIE} />,
          subtitle: 'Learn new recipe and cook yourself',
        },
  
        {
          title: 'Favorite It',
          backgroundColor: '#D32F2F',
          image: <Image source={FAV} />,
          subtitle: 'Save food to your favorite',
        },
        {
          title: "Ready to Eat ?",
          image: <Image source={FAV} />,
          subtitle: (
            <Button
              title={'Get Started'}
              containerViewStyle={{ marginTop: 20 }}
              backgroundColor={'white'}
              borderRadius={5}
              textStyle={{ color: '#003c8f' }}
              onPress={() => navigation.navigate('HomeTabs')}
  
            />
          ),
          backgroundColor: '#003c8f',
          image: (
            <Icon name="rocket" type="font-awesome" size={100} color="white" />
          ),
        },
      ]}
    />
  );

  export default OnBoard;