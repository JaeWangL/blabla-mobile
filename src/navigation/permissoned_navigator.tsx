import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PermissionedParamsList, ScreenTypes } from '@/configs/screen_types';
import ArchivesScreen from '@/screens/archives';
import HomeScreen from '@/screens/home';
import SettingsScreen from '@/screens/settings';

const Tab = createBottomTabNavigator<PermissionedParamsList>();

export function PermissionedNavigator(): JSX.Element {
  return (
    <Tab.Navigator>
      <Tab.Screen name={ScreenTypes.ARCHIVES} component={ArchivesScreen} />
      <Tab.Screen name={ScreenTypes.HOME} component={HomeScreen} />
      <Tab.Screen name={ScreenTypes.SETTINGS} component={SettingsScreen} />
    </Tab.Navigator>
  );
}
