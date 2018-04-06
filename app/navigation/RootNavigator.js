import { StackNavigator } from 'react-navigation';
import IntroStack from './IntroStack';
import HomeTabs from './HomeTabs';

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
},
{
  initialRouteName: "IntroStack",
  headerMode: "none",
  // mode: "modal",

}

)