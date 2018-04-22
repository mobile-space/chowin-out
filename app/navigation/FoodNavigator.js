import { StackNavigator } from 'react-navigation';
import FoodChooseStack from './FoodStack';
import RestaurantScreen from '../screens/RestaurantScreen';
import IntroSlider from '../components/IntroSlider';
import YelpWebView from '../screens/YelpWebView';

const FoodNavigator = StackNavigator({
  FoodChooseStack: {
    screen: FoodChooseStack,
  },
  Restaurant: {
    screen: RestaurantScreen,
  },
  Yelp: {
    screen: YelpWebView
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