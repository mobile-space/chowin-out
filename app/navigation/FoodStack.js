import { StackNavigator } from 'react-navigation';

import FoodChooseScreen from '../screens/FoodChooseScreen';
import RestaurantScreen from '../screens/RestaurantScreen';

const FoodChooseStack = StackNavigator({
  FoodChooseStack: {
    screen: FoodChooseScreen,
  },
  Restaurant: {
    screen: RestaurantScreen,
  }
},
  {
    // headerMode: 'none',
  }
);
export default FoodChooseStack;
