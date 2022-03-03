import { createStackNavigator } from '@react-navigation/stack';
import { ScreenTypes, ArchivesParamsList } from '@/configs/screen_types';
import ArchivesScreen from '@/screens/archives';
import PostDetailScreen from '@/screens/postDetail';

const Main = createStackNavigator<ArchivesParamsList>();

export function ArchivesNavigator(): JSX.Element {
  return (
    <Main.Navigator>
      <Main.Screen name={ScreenTypes.ARCHIVES} component={ArchivesScreen} />
      <Main.Screen name={ScreenTypes.ARCHIVE_POST_DETAIL} component={PostDetailScreen} />
    </Main.Navigator>
  );
}
