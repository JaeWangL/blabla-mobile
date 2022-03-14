import DayJS from 'dayjs';
import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { Text, View } from 'react-native-ui-lib';
import { styles } from './styles';

type BalloonLeftProps = {
  senderNickName: string;
  displayNickName?: boolean;
  message: string;
  createdAt: Date;
};

function BalloonLeft(props: BalloonLeftProps): JSX.Element {
  const { createdAt, displayNickName, message, senderNickName } = props;

  return (
    <View>
      {displayNickName && <Text style={styles.nickName}>{senderNickName}</Text>}
      <View style={[styles.balloon, styles.others]}>
        <View style={[styles.cloudContainer, styles.cloudLeft]}>
          <Text style={[styles.messageLabel, styles.messageOthers]}>{message}</Text>
        </View>
        <Text style={styles.dateLabel}>{DayJS(createdAt).format('A hh:mm')}</Text>
      </View>
    </View>
  );
}

BalloonLeft.defaultProps = {
  displayNickName: true,
} as BalloonLeftProps;

export default memo(BalloonLeft, IsEqual);
