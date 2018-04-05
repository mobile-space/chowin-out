import { StackNavigator } from 'react-navigation';
import IntroStack from './IntroStack';

export default StackNavigator ({
  IntroStack: {
    screen: IntroStack,
  },
},
{
  initialRouteName: "IntroStack",
  headerMode: "none",
  mode: "modal",
  navigationOptions: {
    gesturesEnabled: false,
  },
}

)