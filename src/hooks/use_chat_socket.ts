import { useCallback, useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { apiKeys } from '../configs/api_keys';
import { ChatPubDestination, ChatSubDestination } from '../configs/socket_keys';
import { JoinRoomRequest, JoinedNewMember, LeavedExistingMember, SentMessage } from '../dtos/chat_dtos';
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
  const socket = useRef<Socket | null>(null);
  const [nickName, setNickName] = useState<string>('');

  const initAsync = useCallback(async (): Promise<void> => {
    if (socket.current) {
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

    socket.current = chatSocket;
  }, []);

  const leaveAsync = useCallback(async (): Promise<void> => {
    if (!socket.current) {
      return;
    }

    if (handleDisconnect) {
      handleDisconnect();
    }
    socket.current?.disconnect();
  }, [socket.current]);

  useEffect(() => {
    initAsync();

    return () => {
      leaveAsync();
    };
  }, []);

  return { chatSocket: socket.current, nickName };
}
