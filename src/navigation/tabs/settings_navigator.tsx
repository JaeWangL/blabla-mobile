import { createStackNavigator } from '@react-navigation/stack';
import { ScreenTypes, SettingsParamsList } from '@/configs/screen_types';
import InfoDevelopersScreen from '@/screens/infoDevelopers';
import SettingsScreen from '@/screens/settings';

const Main = createStackNavigator<SettingsParamsList>();

export function SettingssNavigator(): JSX.Element {
  return (
    <Main.Navigator screenOptions={{ headerShown: false }}>
      <Main.Screen name={ScreenTypes.SETTINGS} component={SettingsScreen} />
      <Main.Screen name={ScreenTypes.INFO_DEVELOPERS} component={InfoDevelopersScreen} />
    </Main.Navigator>
  );
}
