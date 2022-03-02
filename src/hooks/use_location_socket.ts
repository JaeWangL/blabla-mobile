import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { apiKeys } from '../configs/api_keys';

export function useLocationSocket(): Client | null {
  const socketRef = useRef<Client | null>(null);

  function connectUser(): void {
    const locationSocket = new Client({
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
        // TODO
      },
      onStompError(frame) {
        // TODO
      },
    });

    locationSocket.activate();

    socketRef.current = locationSocket;
  }

  useEffect(() => {
    connectUser();
  }, []);

  return socketRef.current;
}
