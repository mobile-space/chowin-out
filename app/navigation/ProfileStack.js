import { StackNavigator } from 'react-navigation';
import ProfileScreen from '../screens/ProfileScreen';
import FoodDetailsScreen from '../screens/FoodDetailsScreen';
import RecipeWebView from '../screens/RecipeWebView';


const ProfileStack = StackNavigator({
  Profile: {
    screen: ProfileScreen
  },
  FoodDetails: {
    screen: FoodDetailsScreen
  },

  Recipe:{
    screen: RecipeWebView,
    headerMode: 'none',

  },
},
  {
    initialRouteName: 'Profile',
    
  }
);

export default ProfileStack;
