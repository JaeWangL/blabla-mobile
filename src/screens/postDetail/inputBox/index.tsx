import { memo, useCallback, useState } from 'react';
import IsEqual from 'react-fast-compare';
import { Button } from 'react-native';
import { Incubator } from 'react-native-ui-lib';
import { Socket } from 'socket.io-client';
import { ChatSocketDestination } from '@/configs/socket_keys';
import { SendMessageRequest } from '@/dtos/chat_dtos';
import { PostDetailDTO } from '@/dtos/post_dtos';

const { TextField } = Incubator;

type ChatViewProps = {
  chatSocket: Socket | null;
  post: PostDetailDTO;
  nickName: string;
};

function InputBox(props: ChatViewProps): JSX.Element {
  const { chatSocket, nickName, post } = props;
  const [text, setText] = useState<string>('');

  const onSendClick = useCallback((): void => {
    if (!nickName || !text) {
      return;
    }

    chatSocket?.emit(ChatSocketDestination.SEND_MESSAGE, {
      roomId: post.id,
      nickName,
      message: text,
    } as SendMessageRequest);
    setText('');
  }, [text]);

  return (
    <>
      <TextField value={text} onChangeText={setText} placeholder="Type messages ..." />
      <Button title="Send" onPress={onSendClick} />
    </>
  );
}

export default memo(InputBox, IsEqual);
