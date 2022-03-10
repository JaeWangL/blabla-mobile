import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { apiKeys } from '../configs/api_keys';
import { ChatPubDestination, ChatSubDestination } from '../configs/socket_keys';
import { JoinRoomRequest, LeaveRoomRequest, SentMessage } from '../dtos/chat_dtos';
import { getDeviceInfo } from '../helpers/device_utils';

type ChatSocketProps = {
  roomId: string;
  subGetProfile: (nickName: string) => void;
  subNewMessage: (message: SentMessage) => void;
  handleDisconnect?: () => void;
};

export function useChatSocket(props: ChatSocketProps): Socket | null {
  const { handleDisconnect, roomId, subGetProfile, subNewMessage } = props;
  const socketRef = useRef<Socket | null>(null);

  const initAsync = async (socket: Socket): Promise<void> => {
    const deviceInfo = await getDeviceInfo();
    if (!deviceInfo) {
      return;
    }

    socket.emit(ChatPubDestination.JOIN_ROOM, {
      roomId,
      deviceType: deviceInfo.deviceType,
      deviceId: deviceInfo.deviceId,
    } as JoinRoomRequest);

    socket.on(ChatSubDestination.GET_PROFILE, (nickName: string) => {
      subGetProfile(nickName);
    });

    socket.on(ChatSubDestination.NEW_MESSAGE, (message: SentMessage) => {
      subNewMessage(message);
    });
  };

  const leaveAsync = async (): Promise<void> => {
    const deviceInfo = await getDeviceInfo();
    if (!deviceInfo) {
      return;
    }

    try {
      socketRef.current?.emit(ChatPubDestination.LEAVE_ROOM, {
        roomId,
        deviceType: deviceInfo.deviceType,
        deviceId: deviceInfo.deviceId,
      } as LeaveRoomRequest);

      if (handleDisconnect) {
        handleDisconnect();
      }

      socketRef.current?.off(ChatSubDestination.GET_PROFILE);
      socketRef.current?.off(ChatSubDestination.NEW_MESSAGE);
    } finally {
      socketRef.current?.disconnect();
    }
  };

  function connectUser(): void {
    const chatSocket = io(apiKeys.chatDomain, {
      reconnectionAttempts: 2,
      transports: ['websocket', 'polling', 'flashsocket'],
      path: '/ws-chat/',
    });

    initAsync(chatSocket);

    socketRef.current = chatSocket;
  }

  useEffect(() => {
    connectUser();

    return () => {
      leaveAsync();
    };
  }, []);

  return socketRef.current;
}
