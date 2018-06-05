import { StackNavigator } from 'react-navigation';

import TakePictureScreen from '../screens/TakePictureScreen';
import RecognitionResultScreen from '../screens/RecognitionResultScreen';
import FoodListScreen from '../screens/FoodListScreen';
import FoodDetailsScreen from '../screens/FoodDetailsScreen';
import RecipeWebView from '../screens/RecipeWebView';

const CameraStack = StackNavigator({
  Camera: {
    screen: TakePictureScreen,
  },
  RecognitionResult: {
    screen: RecognitionResultScreen,
  },
  FoodList: {
    screen: FoodListScreen,
  },
  FoodRecipe: {
    screen: FoodDetailsScreen,
  },
  Recipe:{
    screen: RecipeWebView,
    headerMode: 'none',
  },

},
  {
    initialRouteName: 'Camera',
  }
);
export default CameraStack;
