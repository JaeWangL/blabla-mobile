import { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { defaultTheme } from '@/themes';
import { PermissionedParamsList, ScreenTypes } from '@/configs/screen_types';
import IcTabArchives from '@assets/icons/ic_tab_archives.svg';
import IcTabArchivesActive from '@assets/icons/ic_tab_archives_active.svg';
import IcTabHome from '@assets/icons/ic_tab_home.svg';
import IcTabHomeActive from '@assets/icons/ic_tab_home_active.svg';
import IcTabSettings from '@assets/icons/ic_tab_settings.svg';
import IcTabSettingsActive from '@assets/icons/ic_tab_settings_active.svg';
import { useLocationSocket } from '@/hooks/use_location_socket';
import { ArchivesNavigator } from './tabs/archives_navigator';
import { HomeNavigator } from './tabs/home_navigator';
import { SettingssNavigator } from './tabs/settings_navigator';

const Tab = createBottomTabNavigator<PermissionedParamsList>();

export function PermissionedNavigator(): JSX.Element {
  useLocationSocket();

  const renderTabArchivesIcon = useCallback((focused: boolean, size: number): JSX.Element => {
    return focused ? <IcTabArchivesActive width={size} height={size} /> : <IcTabArchives width={size} height={size} />;
  }, []);

  const renderTabHomeIcon = useCallback((focused: boolean, size: number): JSX.Element => {
    return focused ? <IcTabHomeActive width={size} height={size} /> : <IcTabHome width={size} height={size} />;
  }, []);

  const renderTabSettingsIcon = useCallback((focused: boolean, size: number): JSX.Element => {
    return focused ? <IcTabSettingsActive width={size} height={size} /> : <IcTabSettings width={size} height={size} />;
  }, []);

  return (
    <Tab.Navigator initialRouteName={ScreenTypes.STACK_HOME} screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={ScreenTypes.STACK_ARCHIVES}
        component={ArchivesNavigator}
        options={{
          tabBarLabel: 'Archives',
          tabBarActiveTintColor: defaultTheme.tabActive,
          tabBarInactiveTintColor: defaultTheme.tabInactive,
          tabBarIcon: ({ focused }) => renderTabArchivesIcon(focused, 28),
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name={ScreenTypes.STACK_HOME}
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: defaultTheme.tabActive,
          tabBarInactiveTintColor: defaultTheme.tabInactive,
          tabBarIcon: ({ focused }) => renderTabHomeIcon(focused, 28),
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name={ScreenTypes.STACK_SETTINGS}
        component={SettingssNavigator}
        options={{
          tabBarLabel: 'Settings',
          tabBarActiveTintColor: defaultTheme.tabActive,
          tabBarInactiveTintColor: defaultTheme.tabInactive,
          tabBarIcon: ({ focused }) => renderTabSettingsIcon(focused, 28),
        }}
      />
    </Tab.Navigator>
  );
}
