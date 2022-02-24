import { createStackNavigator } from '@react-navigation/stack';
import { ScreenTypes, UnPermissionedParamsList } from '@/configs/screen_types';
import OnBoardingScreen from '@/screens/onBoarding';

const Main = createStackNavigator<UnPermissionedParamsList>();

export function UnPermissionedNavigator(): JSX.Element {
  return (
    <Main.Navigator>
      <Main.Screen name={ScreenTypes.ON_BOARDING} component={OnBoardingScreen} />
    </Main.Navigator>
  );
}
