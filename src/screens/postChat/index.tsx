import DayJS from 'dayjs';
import { memo, useCallback, useState } from 'react';
import IsEqual from 'react-fast-compare';
import { KeyboardAvoidingView, FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { Button, Incubator } from 'react-native-ui-lib';
import { useRoute, RouteProp } from '@react-navigation/native';
import { ArchivesParamsList, ScreenTypes } from '@/configs/screen_types';
import { ChatPubDestination } from '@/configs/socket_keys';
import { SendMessageRequest } from '@/dtos/chat_dtos';
import { useChatSocket } from '@/hooks/use_chat_socket';
import { MessageState } from './interfaces';
import { styles } from './styles';

const { TextField } = Incubator;

type ScreenRouteProps = RouteProp<ArchivesParamsList, ScreenTypes.ARCHIVES_POST_DETAIL>;

function PostChatScreen(): JSX.Element {
  const route = useRoute<ScreenRouteProps>();
  const [userNickName, setUserNickName] = useState<string>('');
  const [messages, setMessages] = useState<MessageState[]>([]);
  const [text, setText] = useState<string>('');

  const handleSocketDisconnect = useCallback(() => {
    setUserNickName('');
    setMessages([]);
  }, []);

  const chatSocket = useChatSocket({
    roomId: route.params.post.id,
    subGetProfile: setUserNickName,
    subNewMessage: (message) =>
      setMessages((prev) => [...prev, { nickName: message.nickName, message: message.message } as MessageState]),
    handleDisconnect: handleSocketDisconnect,
  });

  const onSendClick = useCallback((): void => {
    if (!userNickName || !text) {
      return;
    }

    chatSocket?.emit(ChatPubDestination.SEND_MESSAGE, {
      roomId: route.params.post.id,
      nickName: userNickName,
      message: text,
    } as SendMessageRequest);
    setText('');
  }, [text]);

  const renderMessages = (info: ListRenderItemInfo<MessageState>): JSX.Element => (
    <Text key={DayJS().valueOf()}>{info.item.message}</Text>
  );

  if (!userNickName) {
    return (
      <View style={styles.wrapper}>
        <Text>Loading ...</Text>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView style={styles.wrapper}>
      <FlatList data={messages} renderItem={renderMessages} />
      <TextField value={text} onChangeText={setText} placeholder="Type messages ..." />
      <Button style={styles.buttonSend} label="Send" onPress={onSendClick} />
    </KeyboardAvoidingView>
  );
}

export default memo(PostChatScreen, IsEqual);
