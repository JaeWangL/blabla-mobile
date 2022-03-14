import { memo, useMemo } from 'react';
import IsEqual from 'react-fast-compare';
import BalloonLeft from './balloon_left';
import BalloonRight from './balloon_right';

type ChatBalloonProps = {
  senderNickName: string;
  currentNickName: string;
  displaySenderNickName?: boolean;
  message: string;
  createdAt: Date;
};

function ChatBalloon(props: ChatBalloonProps): JSX.Element {
  const { createdAt, currentNickName, displaySenderNickName, message, senderNickName } = props;

  const isReceived = useMemo(() => currentNickName !== senderNickName, []);

  return isReceived ? (
    <BalloonLeft
      senderNickName={senderNickName}
      displayNickName={displaySenderNickName}
      message={message}
      createdAt={createdAt}
    />
  ) : (
    <BalloonRight message={message} createdAt={createdAt} />
  );
}

ChatBalloon.defaultProps = {
  displaySenderNickName: true,
} as ChatBalloonProps;

export default memo(ChatBalloon, IsEqual);
