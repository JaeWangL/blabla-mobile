import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { apiKeys } from '../configs/api_keys';

export function useLocationSocket(): Socket | null {
  const socketRef = useRef<Socket | null>(null);

  function connectUser(): void {
    const locationSocket = io(apiKeys.locationDomain, {
      reconnectionAttempts: 2,
      transports: ['websocket', 'polling', 'flashsocket'],
      path: '/ws-location/',
    });

    socketRef.current = locationSocket;
  }

  useEffect(() => {
    connectUser();
  }, []);

  return socketRef.current;
}
