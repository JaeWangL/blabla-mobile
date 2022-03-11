import { memo, useMemo } from 'react';
import IsEqual from 'react-fast-compare';
import BalloonLeft from './balloon_left';
import BalloonRight from './balloon_right';

type ChatBalloonProps = {
  senderNickName: string;
  currentNickName: string;
  displaySenderNickName?: boolean;
  message: string;
};

function ChatBalloon(props: ChatBalloonProps): JSX.Element {
  const { currentNickName, displaySenderNickName, message, senderNickName } = props;

  const isReceived = useMemo(() => currentNickName !== senderNickName, []);

  return isReceived ? (
    <BalloonLeft senderNickName={senderNickName} displayNickName={displaySenderNickName} message={message} />
  ) : (
    <BalloonRight message={message} />
  );
}

ChatBalloon.defaultProps = {
  displaySenderNickName: true,
} as ChatBalloonProps;

export default memo(ChatBalloon, IsEqual);
