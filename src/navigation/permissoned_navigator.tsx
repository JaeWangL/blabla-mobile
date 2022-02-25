import * as Location from 'expo-location';
import { useCallback, useEffect } from 'react';
import { AppState, Platform } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PermissionedParamsList, ScreenTypes } from '@/configs/screen_types';
import { LocationSocketTypes } from '@/configs/socket_keys';
import { useLocationSocket } from '@/hooks/use_location_socket';
import { locationAtom } from '@/recoils/location_states';
import ArchivesScreen from '@/screens/archives';
import HomeScreen from '@/screens/home';
import SettingsScreen from '@/screens/settings';

const Tab = createBottomTabNavigator<PermissionedParamsList>();

export function PermissionedNavigator(): JSX.Element {
  const setLocation = useSetRecoilState(locationAtom);
  const locationSocket = useLocationSocket();

  const initAsync = useCallback(async (): Promise<void> => {
    // TODO: Change to `startLocationUpdatesAsync` for background tasks
    // with `expo-task-manager`
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 2000,
      },
      (loc) => {
        setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
        if (locationSocket) {
          locationSocket.emit(LocationSocketTypes.UPDATE_LOCATION, {
            deviceType: Platform.OS === 'android' ? 1 : 2,
            deviceId: 'test',
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
        }
      },
    );
  }, [locationSocket]);

  const onAppStateChange = useCallback(
    (nextAppState: 'active' | 'background' | 'inactive' | 'unknown' | 'extension'): void => {
      if (nextAppState !== 'active') {
        locationSocket?.close();
      }
    },
    [locationSocket],
  );

  useEffect((): void => {
    initAsync();

    AppState.addEventListener('change', onAppStateChange);

    return (): void => {
      AppState.removeEventListener('change', onAppStateChange);
    };
  }, []);

  const renderCustomTabIcon = useCallback((name, focused): JSX.Element => {
    return <Ionicons name={name} size={28} style={{ color: focused ? '#00B386' : '#404040' }} />;
  }, []);

  return (
    <Tab.Navigator initialRouteName={ScreenTypes.HOME}>
      <Tab.Screen
        name={ScreenTypes.ARCHIVES}
        component={ArchivesScreen}
        options={{
          tabBarActiveTintColor: '#00B386',
          tabBarInactiveTintColor: '#404040',
          tabBarIcon: ({ focused }) => renderCustomTabIcon('list-circle-outline', focused),
        }}
      />
      <Tab.Screen
        name={ScreenTypes.HOME}
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: '#00B386',
          tabBarInactiveTintColor: '#404040',
          tabBarIcon: ({ focused }) => renderCustomTabIcon('navigate-circle-outline', focused),
        }}
      />
      <Tab.Screen
        name={ScreenTypes.SETTINGS}
        component={SettingsScreen}
        options={{
          tabBarActiveTintColor: '#00B386',
          tabBarInactiveTintColor: '#404040',
          tabBarIcon: ({ focused }) => renderCustomTabIcon('settings-outline', focused),
        }}
      />
    </Tab.Navigator>
  );
}
