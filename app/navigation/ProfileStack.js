import { StackNavigator } from 'react-navigation';
import ProfileScreen from '../screens/ProfileScreen';
import FoodDetailsScreen from '../screens/FoodDetailsScreen';


const ProfileStack = StackNavigator({
  Profile: {
    screen: ProfileScreen
  },
  FoodDetails: {
    screen: FoodDetailsScreen
  },
},
  {
    initialRouteName: 'Profile',
  }
);

export default ProfileStack;
