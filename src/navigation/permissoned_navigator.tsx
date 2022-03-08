import * as Location from 'expo-location';
import { useCallback, useEffect } from 'react';
import { AppState } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSetRecoilState } from 'recoil';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { defaultTheme } from '@/themes';
import { PermissionedParamsList, ScreenTypes } from '@/configs/screen_types';
import { LocationSocketDestination } from '@/configs/socket_keys';
import { getDeviceInfo } from '@/helpers/device_utils';
import { useLocationSocket } from '@/hooks/use_location_socket';
import { locationAtom } from '@/recoils/location_states';
import SettingsScreen from '@/screens/settings';
import IcTabArchives from '@assets/icons/ic_tab_archives.svg';
import IcTabArchivesActive from '@assets/icons/ic_tab_archives_active.svg';
import IcTabHome from '@assets/icons/ic_tab_home.svg';
import IcTabHomeActive from '@assets/icons/ic_tab_home_active.svg';
import IcTabSettings from '@assets/icons/ic_tab_settings.svg';
import IcTabSettingsActive from '@assets/icons/ic_tab_settings_active.svg';
import { ArchivesNavigator } from './tabs/archives_navigator';
import { HomeNavigator } from './tabs/home_navigator';

const Tab = createBottomTabNavigator<PermissionedParamsList>();

export function PermissionedNavigator(): JSX.Element {
  const setLocation = useSetRecoilState(locationAtom);
  const locationSocket = useLocationSocket();

  const onLocationChnaged = useCallback(
    async (loc: Location.LocationObject): Promise<void> => {
      const deviceInfo = await getDeviceInfo();
      if (!deviceInfo) {
        return;
      }

      setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      if (locationSocket?.connected) {
        locationSocket?.publish({
          destination: LocationSocketDestination.UPDATE_LOCATION,
          body: JSON.stringify({
            deviceType: deviceInfo.deviceType,
            deviceId: deviceInfo.deviceId,
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          }),
        });
      }
    },
    [locationSocket],
  );

  const initAsync = useCallback(async (): Promise<void> => {
    // TODO: Change to `startLocationUpdatesAsync` for background tasks
    // with `expo-task-manager`
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 2000,
      },
      (loc) => {
        onLocationChnaged(loc);
      },
    );

    if (locationSocket?.connected) {
      locationSocket?.subscribe(LocationSocketDestination.CREATED_NEW_POST, ({ body }: { body: string }) => {
        Toast.show({
          type: 'success',
          text1: 'New post alert',
          text2: body,
        });
      });
    }
  }, [locationSocket]);

  const onAppStateChange = useCallback(
    (nextAppState: 'active' | 'background' | 'inactive' | 'unknown' | 'extension'): void => {
      if (nextAppState !== 'active') {
        locationSocket?.deactivate();
      }
    },
    [locationSocket],
  );

  useEffect(() => {
    initAsync();

    AppState.addEventListener('change', onAppStateChange);

    return () => {
      AppState.removeEventListener('change', onAppStateChange);
    };
  }, []);

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
        }}
      />
      <Tab.Screen
        name={ScreenTypes.SETTINGS}
        component={SettingsScreen}
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
