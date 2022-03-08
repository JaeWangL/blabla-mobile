import { createStackNavigator } from '@react-navigation/stack';
import { ScreenTypes, ArchivesParamsList } from '@/configs/screen_types';
import ArchivesScreen from '@/screens/archives';
import PostDetailScreen from '@/screens/postDetail';
import PostWriteScreen from '@/screens/postWrite';

const Main = createStackNavigator<ArchivesParamsList>();

export function ArchivesNavigator(): JSX.Element {
  return (
    <Main.Navigator screenOptions={{ headerShown: false }}>
      <Main.Screen name={ScreenTypes.ARCHIVES} component={ArchivesScreen} />
      <Main.Screen name={ScreenTypes.ARCHIVES_POST_DETAIL} component={PostDetailScreen} />
      <Main.Screen name={ScreenTypes.ARCHIVES_POST_WRITE} component={PostWriteScreen} />
    </Main.Navigator>
  );
}
