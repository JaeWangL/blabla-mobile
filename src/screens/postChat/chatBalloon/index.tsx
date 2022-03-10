import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import BalloonLeft from './balloon_left';
import BalloonRight from './balloon_right';

type ChatBalloonProps = {
  isReceived: boolean;
  message: string;
};

function ChatBalloon(props: ChatBalloonProps): JSX.Element {
  const { isReceived, message } = props;

  return isReceived ? <BalloonLeft message={message} /> : <BalloonRight message={message} />;
}

export default memo(ChatBalloon, IsEqual);
