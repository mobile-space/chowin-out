import { StackNavigator } from 'react-navigation';
import IntroStack from './IntroStack';
import HomeTabs from './HomeTabs';

export default StackNavigator ({
  IntroStack: {
    screen: HomeTabs,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  HomeTabs: {
    screen: HomeTabs,
  },
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