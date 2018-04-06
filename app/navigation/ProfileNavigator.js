import { StackNavigator } from 'react-navigation';
import ProfileStack from './ProfileStack';



const ProfileNavigator = StackNavigator({
  ProfileStack: {
    screen: ProfileStack
  },
  
}, {
  initialRouteName: 'ProfileStack',
  mode: 'modal',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
});

export default ProfileNavigator;