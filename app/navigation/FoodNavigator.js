import { StackNavigator } from 'react-navigation';
import FoodChooseStack from './FoodStack';
import RestaurantScreen from '../screens/RestaurantScreen';
import IntroSlider from '../components/IntroSlider';

const FoodNavigator = StackNavigator({
  FoodChooseStack: {
    screen: FoodChooseStack,
  },
  Restaurant: {
    screen: RestaurantScreen,
  }

}, {
    initialRouteName: 'FoodChooseStack',
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
);

export default FoodNavigator;