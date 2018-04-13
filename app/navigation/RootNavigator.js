import { StackNavigator } from 'react-navigation';
import IntroStack from './IntroStack';
import HomeTabs from './HomeTabs';
import GeoLocation from '../components/GeoLocation';

export default StackNavigator ({
  IntroStack: {
    screen: IntroStack,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  HomeTabs: {
    screen: HomeTabs,
  },
  GeoLocation: {
    screen: GeoLocation
  }
},
{
  initialRouteName: "IntroStack",
  headerMode: "none",
  mode: "modal",
  navigationOptions: {
    gesturesEnabled: false
  },

}

)