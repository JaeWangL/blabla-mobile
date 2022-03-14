import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { apiKeys } from '../configs/api_keys';
import { ChatPubDestination, ChatSubDestination } from '../configs/socket_keys';
import {
  JoinRoomRequest,
  JoinedNewMember,
  LeaveRoomRequest,
  LeavedExistingMember,
  SentMessage,
} from '../dtos/chat_dtos';
import { getDeviceInfo } from '../helpers/device_utils';

type ChatSocketProps = {
  roomId: string;
  subNewMemberJoined: (res: JoinedNewMember) => void;
  subMemberLeaved: (res: LeavedExistingMember) => void;
  subNewMessage: (res: SentMessage) => void;
  handleDisconnect?: () => void;
};

type ChatSocketType = {
  chatSocket: Socket | null;
  nickName: string;
};

export function useChatSocket(props: ChatSocketProps): ChatSocketType {
  const { handleDisconnect, roomId, subMemberLeaved, subNewMemberJoined, subNewMessage } = props;
  const [socket, setSocket] = useState<Socket | null>(null);
  const [nickName, setNickName] = useState<string>('');

  const initAsync = async (): Promise<void> => {
    if (socket) {
      return;
    }

    const chatSocket = io(apiKeys.chatDomain, {
      reconnectionAttempts: 2,
      transports: ['websocket'],
      path: '/ws-chat/',
      upgrade: false,
    });
    const deviceInfo = await getDeviceInfo();
    if (!deviceInfo) {
      return;
    }

    chatSocket.emit(ChatPubDestination.JOIN_ROOM, {
      roomId,
      deviceType: deviceInfo.deviceType,
      deviceId: deviceInfo.deviceId,
    } as JoinRoomRequest);

    chatSocket.on(ChatSubDestination.GET_PROFILE, setNickName);
    chatSocket.on(ChatSubDestination.JOINED_NEW_MEMBER, subNewMemberJoined);
    chatSocket.on(ChatSubDestination.LEAVED_EXISTING_MEMBER, subMemberLeaved);
    chatSocket.on(ChatSubDestination.NEW_MESSAGE, subNewMessage);

    setSocket(chatSocket);
  };

  const leaveAsync = async (): Promise<void> => {
    const deviceInfo = await getDeviceInfo();
    if (!deviceInfo || !socket) {
      return;
    }

    try {
      socket.emit(ChatPubDestination.LEAVE_ROOM, {
        roomId,
        deviceType: deviceInfo.deviceType,
        deviceId: deviceInfo.deviceId,
        nickName,
      } as LeaveRoomRequest);

      if (handleDisconnect) {
        handleDisconnect();
      }

      socket.off(ChatSubDestination.GET_PROFILE, setNickName);
      socket.off(ChatSubDestination.JOINED_NEW_MEMBER, subNewMemberJoined);
      socket.off(ChatSubDestination.LEAVED_EXISTING_MEMBER, subMemberLeaved);
      socket.off(ChatSubDestination.NEW_MESSAGE, subNewMessage);
    } finally {
      socket.disconnect();
      setNickName('');
      setSocket(null);
    }
  };

  useEffect(() => {
    initAsync();

    return () => {
      leaveAsync();
    };
  }, []);

  return { chatSocket: socket, nickName };
}
