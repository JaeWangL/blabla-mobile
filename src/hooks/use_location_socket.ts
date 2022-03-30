import * as Location from 'expo-location';
import { useCallback, useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSetRecoilState } from 'recoil';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { apiKeys } from '@/configs/api_keys';
import { LocationSocketDestination } from '@/configs/socket_keys';
import { getDeviceInfo } from '@/helpers/device_utils';
import { translate } from '@/i18n';
import { locationAtom } from '@/recoils/location_states';

export function useLocationSocket(): Client | null {
  const setLocation = useSetRecoilState(locationAtom);
  const socketRef = useRef<Client | null>(null);
  const watchRef = useRef<Location.LocationSubscription | null>(null);

  const onLocationChnaged = useCallback(async (socket: Client, loc: Location.LocationObject): Promise<void> => {
    const deviceInfo = await getDeviceInfo();
    if (!deviceInfo) {
      return;
    }

    setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });

    if (!socket.connected) {
      return;
    }
    socket.publish({
      destination: LocationSocketDestination.UPDATE_LOCATION,
      body: JSON.stringify({
        deviceType: deviceInfo.deviceType,
        deviceId: deviceInfo.deviceId,
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      }),
    });
  }, []);

  const connectAsync = useCallback(async (): Promise<void> => {
    if (socketRef.current) {
      return;
    }

    const locationSocket = new Client();
    locationSocket.configure({
      brokerURL: apiKeys.locationsStomp,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      webSocketFactory() {
        return new SockJS(apiKeys.locationsSockJS);
      },
      debug(str) {
        // TODO
      },
      onConnect(frame) {
        locationSocket.subscribe(LocationSocketDestination.CREATED_NEW_POST, ({ body }: { body: string }) => {
          Toast.show({
            type: 'success',
            text1: translate('dialogs.newPostTitle'),
            text2: body,
          });
        });
      },
      onStompError(frame) {
        // TODO
      },
    });
    locationSocket.activate();
    socketRef.current = locationSocket;

    const lastPosition = await Location.getLastKnownPositionAsync();
    if (lastPosition) {
      onLocationChnaged(locationSocket, lastPosition);
    }
  }, []);

  const leave = useCallback((): void => {
    watchRef.current?.remove();
    socketRef.current?.deactivate();
  }, [watchRef.current, socketRef.current]);

  const onAppStateChange = useCallback(
    (nextAppState: 'active' | 'background' | 'inactive' | 'unknown' | 'extension'): void => {
      if (nextAppState !== 'active') {
        leave();
      } else {
        connectAsync();
      }
    },
    [socketRef.current],
  );

  useEffect(() => {
    connectAsync();

    AppState.addEventListener('change', onAppStateChange);

    return () => {
      AppState.removeEventListener('change', onAppStateChange);
      leave();
    };
  }, []);

  useEffect(() => {
    const initAsync = async (): Promise<void> => {
      if (!socketRef.current) {
        return;
      }

      watchRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Lowest,
          timeInterval: 2000,
          distanceInterval: 5,
        },
        (loc) => {
          onLocationChnaged(socketRef.current!, loc);
        },
      );
    };

    initAsync();
  }, [socketRef.current, socketRef.current?.connected]);

  return socketRef.current;
}
