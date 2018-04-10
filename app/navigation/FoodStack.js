import { StackNavigator } from 'react-navigation';

import FoodChooseScreen from '../screens/FoodChooseScreen';
import RestaurantsListScreen from '../screens/RestaurantsListScreen';

const FoodChooseStack = StackNavigator({
  FoodChooseStack: {
    screen: FoodChooseScreen,
  },
  RestaurantsList: {
    screen: RestaurantsListScreen,
  }
},
  {
    initialRouteName: 'FoodChooseStack',
  }
);
export default FoodChooseStack;
