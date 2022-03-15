import * as Location from 'expo-location';
import { useCallback, useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import Toast from 'react-native-toast-message';
import { useStompClient, useSubscription } from 'react-stomp-hooks';
import { useSetRecoilState } from 'recoil';
import { LocationSocketDestination } from '@/configs/socket_keys';
import { getDeviceInfo } from '@/helpers/device_utils';
import { locationAtom } from '@/recoils/location_states';

export function useLocationSocket(): void {
  const setLocation = useSetRecoilState(locationAtom);
  const stompClient = useStompClient();
  const subscription = useRef<Location.LocationSubscription | null>(null);

  const onLocationChnaged = useCallback(
    async (loc: Location.LocationObject): Promise<void> => {
      const deviceInfo = await getDeviceInfo();
      if (!deviceInfo) {
        return;
      }

      setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      if (stompClient?.connected) {
        stompClient?.publish({
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
    [stompClient],
  );

  const initAsync = useCallback(async (): Promise<void> => {
    stompClient?.activate();

    const current = await Location.getCurrentPositionAsync();
    onLocationChnaged(current);

    // TODO: Change to `startLocationUpdatesAsync` for background tasks
    // with `expo-task-manager`
    const watch = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 2000,
        distanceInterval: 5,
      },
      (loc) => {
        onLocationChnaged(loc);
      },
    );

    subscription.current = watch;
  }, []);

  const onAppStateChange = useCallback(
    (nextAppState: 'active' | 'background' | 'inactive' | 'unknown' | 'extension'): void => {
      if (nextAppState !== 'active') {
        subscription.current?.remove();
        stompClient?.deactivate();
      } else {
        initAsync();
      }
    },
    [subscription.current, stompClient],
  );

  useSubscription(LocationSocketDestination.CREATED_NEW_POST, ({ body }: { body: string }) => {
    Toast.show({
      type: 'success',
      text1: 'New post alert',
      text2: body,
    });
  });

  useEffect(() => {
    initAsync();

    AppState.addEventListener('change', onAppStateChange);

    return () => {
      AppState.removeEventListener('change', onAppStateChange);
    };
  }, []);
}
