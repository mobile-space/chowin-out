import { StackNavigator } from 'react-navigation';

import FoodChooseScreen from '../screens/FoodChooseScreen';
import RestaurantScreen from '../screens/RestaurantScreen';

const FoodChooseStack = StackNavigator({
  FoodChooseStack: {
    screen: FoodChooseScreen,
  },
},
  {
    headerMode: 'none',
  }
);
export default FoodChooseStack;
