import React from 'react';
import { Platform } from 'react-native';

import { TabNavigator } from 'react-navigation';
import { SimpleLineIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import FoodNavigator from './FoodNavigator';
import ProfileNavigator from './ProfileNavigator';
import FoodChooseStack from './FoodStack';


const HomeTabs = TabNavigator({
  FoodTab: {
    screen: FoodNavigator,
    navigationOptions: {
      tabBarLabel: 'FOOD',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          name='food'
          color={tintColor}
          size={Platform.OS === 'ios' ? 22 : 25}
        />
      )
    }
  },
  ProfileTab: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarLabel: 'MY MENU',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          name='menu'
          color={tintColor}
          size={Platform.OS === 'ios' ? 22 : 25}
        />
      ),
    }
  }
}, {
  initialRouteName: 'FoodTab',
  tabBarPosition: 'bottom',
  animationEnabled: Platform.OS === 'ios' ? false : true,
  swipeEnabled: Platform.OS === 'ios' ? false : false,
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    activeTintColor: '#ED5276',
    inactiveTintColor: '#999999',
    style: {
      backgroundColor: '#ffffff',
      padding: Platform.OS === 'ios' ? 5 : 0,
    },
    indicatorStyle: {
      backgroundColor: 'white'
    },
    labelStyle: {
      fontSize: 12
    }
  }
});

export default HomeTabs;