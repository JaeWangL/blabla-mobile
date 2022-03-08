import { createStackNavigator } from '@react-navigation/stack';
import { ScreenTypes, HomeParamsList } from '@/configs/screen_types';
import HomeScreen from '@/screens/home';
import PostDetailScreen from '@/screens/postDetail';
import PostWriteScreen from '@/screens/postWrite';

const Main = createStackNavigator<HomeParamsList>();

export function HomeNavigator(): JSX.Element {
  return (
    <Main.Navigator>
      <Main.Screen name={ScreenTypes.HOME} component={HomeScreen} />
      <Main.Screen name={ScreenTypes.HOME_POST_DETAIL} component={PostDetailScreen} />
      <Main.Screen name={ScreenTypes.HOME_POST_WRITE} component={PostWriteScreen} />
    </Main.Navigator>
  );
}
