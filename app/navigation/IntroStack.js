import { StackNavigator } from 'react-navigation';

import IntroScreen from '../screens/IntroScreen';
import FoodNavigator from './FoodNavigator';

const IntroStack = StackNavigator({
  Intro: {
    screen: IntroScreen,
  },
  FoodNavigator: {
    screen: FoodNavigator,
  },
}, {
  // headerMode: 'none'
}
);
export default IntroStack;
