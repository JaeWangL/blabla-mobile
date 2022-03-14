import DayJS from 'dayjs';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import IsEqual from 'react-fast-compare';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Incubator, Text } from 'react-native-ui-lib';
import { useRoute, RouteProp } from '@react-navigation/native';
import IcSend from '@assets/icons/ic_send.svg';
import CustomAppBar from '@/components/customAppbar';
import KeyboardAwareScrollView from '@/components/keyboardAwareScrollView';
import { ArchivesParamsList, ScreenTypes } from '@/configs/screen_types';
import { ChatPubDestination } from '@/configs/socket_keys';
import { JoinedNewMember, LeavedExistingMember, SendMessageRequest, SentMessage } from '@/dtos/chat_dtos';
import { useChatSocket } from '@/hooks/use_chat_socket';
import ChatBalloon from './chatBalloon';
import { MessageState } from './interfaces';
import { styles } from './styles';

const { TextField } = Incubator;

type ScreenRouteProps = RouteProp<ArchivesParamsList, ScreenTypes.ARCHIVES_POST_DETAIL>;

function PostChatScreen(): JSX.Element {
  const route = useRoute<ScreenRouteProps>();
  const messagesRef = useRef<FlatList>(null);
  const [messages, setMessages] = useState<MessageState[]>([]);
  const [text, setText] = useState<string>('');

  const handleSubNewMessage = useCallback((res: SentMessage) => {
    setMessages((prev) => [
      ...prev,
      { nickName: res.nickName, message: res.message, createdAt: res.createdAt } as MessageState,
    ]);
  }, []);

  const handleNewMemberJoined = useCallback((res: JoinedNewMember) => {
    setMessages((prev) => [
      ...prev,
      { nickName: '알림', message: `${res.nickName} 님이 입장하셨습니다.`, createdAt: res.joinedAt } as MessageState,
    ]);
  }, []);

  const handleMemberLeaved = useCallback((res: LeavedExistingMember) => {
    setMessages((prev) => [
      ...prev,
      { nickName: '알림', message: `${res.nickName} 님이 퇴장하셨습니다.`, createdAt: res.leavedAt } as MessageState,
    ]);
  }, []);

  const handleSocketDisconnect = useCallback(() => {
    setMessages([]);
  }, []);

  const { chatSocket, nickName, leaveAsync } = useChatSocket({
    roomId: route.params.post.id,
    subNewMemberJoined: handleNewMemberJoined,
    subMemberLeaved: handleMemberLeaved,
    subNewMessage: handleSubNewMessage,
    handleDisconnect: handleSocketDisconnect,
  });

  useEffect(() => {
    return () => {
      if (chatSocket) {
        leaveAsync(chatSocket);
      }
    };
  }, [chatSocket]);

  const onSendClick = useCallback((): void => {
    if (!chatSocket || !nickName || !text) {
      return;
    }

    chatSocket?.emit(ChatPubDestination.SEND_MESSAGE, {
      roomId: route.params.post.id,
      nickName,
      message: text,
    } as SendMessageRequest);
    setText('');
  }, [chatSocket, text]);

  const onMessageListUpdated = useCallback((): void => {
    messagesRef.current?.scrollToEnd({ animated: true });
  }, [messagesRef.current]);

  const getLastMessage = useMemo(() => messages.pop(), []);

  const renderMessages = useCallback(
    (info: ListRenderItemInfo<MessageState>): JSX.Element => {
      return (
        <ChatBalloon
          senderNickName={info.item.nickName}
          currentNickName={nickName}
          displaySenderNickName={getLastMessage?.nickName !== info.item.nickName}
          message={info.item.message}
        />
      );
    },
    [nickName],
  );

  if (!chatSocket || !nickName) {
    return <Text>Loading ...</Text>;
  }
  return (
    <SafeAreaView edges={['top']} style={styles.wrapper}>
      <CustomAppBar title="소식 나누기" goBack />
      <KeyboardAwareScrollView>
        <>
          <FlatList
            contentContainerStyle={styles.messageListContent}
            ref={messagesRef}
            data={messages}
            renderItem={renderMessages}
            keyExtractor={(item) => DayJS(item.createdAt).valueOf().toString()}
            onContentSizeChange={onMessageListUpdated}
            onLayout={onMessageListUpdated}
          />
          <TextField
            containerStyle={styles.inputContainer}
            fieldStyle={styles.inputfieldContainer}
            value={text}
            onChangeText={setText}
            placeholder="메세지를 입력해 주세요 ..."
            multiline
            trailingAccessory={
              <Button style={styles.buttonSend} iconSource={IcSend} onPress={onSendClick} avoidInnerPadding />
            }
          />
        </>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default memo(PostChatScreen, IsEqual);
