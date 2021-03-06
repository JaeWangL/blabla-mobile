import { createStackNavigator } from '@react-navigation/stack';
import { ScreenTypes, ArchivesParamsList } from '@/configs/screen_types';
import ArchivesScreen from '@/screens/archives';
import PostChatScreen from '@/screens/postChat';
import PostDetailScreen from '@/screens/postDetail';
import PostWriteScreen from '@/screens/postWrite';

const Main = createStackNavigator<ArchivesParamsList>();

export function ArchivesNavigator(): JSX.Element {
  return (
    <Main.Navigator screenOptions={{ headerShown: false }}>
      <Main.Screen name={ScreenTypes.ARCHIVES} component={ArchivesScreen} />
      <Main.Screen name={ScreenTypes.SHARED_POST_DETAIL} component={PostDetailScreen} />
      <Main.Screen name={ScreenTypes.SHARED_POST_WRITE} component={PostWriteScreen} />
      <Main.Screen name={ScreenTypes.SHARED_POST_CHAT} component={PostChatScreen} />
    </Main.Navigator>
  );
}
