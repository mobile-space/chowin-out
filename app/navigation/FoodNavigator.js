import { StackNavigator } from 'react-navigation';
import FoodChooseStack from './FoodStack';
import RestaurantScreen from '../screens/RestaurantScreen';

const FoodNavigator = StackNavigator({
  FoodChooseStack: {
    screen: FoodChooseStack,
  },


}, {
    initialRouteName: 'FoodChooseStack',
    mode: 'card',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
);

export default FoodNavigator;