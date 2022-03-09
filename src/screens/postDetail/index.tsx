import DayJS from 'dayjs';
import { memo, useCallback, useEffect, useState } from 'react';
import IsEqual from 'react-fast-compare';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { useRoute, RouteProp } from '@react-navigation/native';
import { queryKeys } from '@/configs/api_keys';
import { ArchivesParamsList, ScreenTypes } from '@/configs/screen_types';
import { ChatSocketDestination } from '@/configs/socket_keys';
import { LeaveRoomRequest, JoinRoomRequest, SentMessage } from '@/dtos/chat_dtos';
import { getDeviceInfo } from '@/helpers/device_utils';
import { useChatSocket } from '@/hooks/use_chat_socket';
import { getPostById } from '@/services/posts_service';
import InputBox from './inputBox';
import PostContent from './postContent';
import { MessageState } from './interfaces';
import { styles } from './styles';

type ScreenRouteProps = RouteProp<ArchivesParamsList, ScreenTypes.ARCHIVES_POST_DETAIL>;

function PostDetailScreen(): JSX.Element {
  const route = useRoute<ScreenRouteProps>();
  const { post } = route.params;
  const {
    isLoading,
    error,
    data: postData,
  } = useQuery(`${queryKeys.postsByDistance}_${post.id}`, () => getPostById(post.id));
  const chatSocket = useChatSocket();
  const [userNickName, setUserNickName] = useState<string>('');
  const [messages, setMessages] = useState<MessageState[]>([]);

  useEffect(() => {
    const initAsync = async (): Promise<void> => {
      const deviceInfo = await getDeviceInfo();
      if (!deviceInfo) {
        return;
      }

      chatSocket?.emit(ChatSocketDestination.JOIN_ROOM, {
        roomId: post.id,
        deviceType: deviceInfo.deviceType,
        deviceId: deviceInfo.deviceId,
      } as JoinRoomRequest);

      chatSocket?.on(ChatSocketDestination.GET_PROFILE, (nickName: string) => {
        setUserNickName(nickName);
      });

      chatSocket?.on(ChatSocketDestination.NEW_MESSAGE, (message: SentMessage) => {
        setMessages((prev) => [...prev, { nickName: message.nickName, message: message.message } as MessageState]);
      });
    };

    const leaveAsync = async (): Promise<void> => {
      const deviceInfo = await getDeviceInfo();
      if (!deviceInfo) {
        return;
      }

      chatSocket?.emit(ChatSocketDestination.LEAVE_ROOM, {
        roomId: post.id,
        deviceType: deviceInfo.deviceType,
        deviceId: deviceInfo.deviceId,
      } as LeaveRoomRequest);
      setUserNickName('');
      setMessages([]);
    };

    initAsync();

    return () => {
      leaveAsync();
    };
  }, []);

  const renderChatBalloon = useCallback((info: ListRenderItemInfo<MessageState>): JSX.Element => {
    return (
      <Text
        key={DayJS().valueOf()}
        style={info.item.nickName === userNickName ? styles.balloonMe : styles.balloonOthers}
      >
        {info.item.message}
      </Text>
    );
  }, []);

  if (isLoading || !postData) {
    return (
      <View style={styles.wrapper}>
        <Text>Loading ...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.wrapper}>
        <Text>Error!!</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={messages}
      renderItem={renderChatBalloon}
      ListHeaderComponent={<PostContent post={postData} />}
      ListFooterComponent={<InputBox chatSocket={chatSocket} post={postData} nickName={userNickName} />}
    />
  );
}

export default memo(PostDetailScreen, IsEqual);
