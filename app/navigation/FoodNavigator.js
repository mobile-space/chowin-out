import { StackNavigator } from 'react-navigation';
import FoodChooseStack from './FoodStack';
import RestaurantScreen from '../screens/RestaurantScreen';

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
    
  }
);

export default FoodNavigator;