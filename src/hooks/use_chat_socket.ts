import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { apiKeys } from '../configs/api_keys';

export function useChatSocket(): Socket | null {
  const socketRef = useRef<Socket | null>(null);

  function connectUser(): void {
    const chatSocket = io(apiKeys.chatDomain, {
      reconnectionAttempts: 2,
      transports: ['websocket', 'polling', 'flashsocket'],
      path: '/ws-chat/',
    });

    socketRef.current = chatSocket;
  }

  useEffect(() => {
    connectUser();
  }, []);

  return socketRef.current;
}
