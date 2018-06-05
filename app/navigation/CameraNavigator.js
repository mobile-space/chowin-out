import { StackNavigator } from 'react-navigation';
import CameraStack from './CameraStack';

const CameraNavigator = StackNavigator({
  CameraStack: {
    screen: CameraStack,
  },



}, {
    initialRouteName: 'CameraStack',
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
);

export default CameraNavigator;