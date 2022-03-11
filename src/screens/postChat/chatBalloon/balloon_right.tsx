import DayJS from 'dayjs';
import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { Text, View } from 'react-native-ui-lib';
import { styles } from './styles';

type BalloonRightProps = {
  message: string;
};

function BalloonRight(props: BalloonRightProps): JSX.Element {
  const { message } = props;

  return (
    <View style={[styles.balloon, styles.me]}>
      <Text style={styles.dateLabel}>{DayJS(new Date()).format('A hh:mm')}</Text>
      <View style={[styles.cloudContainer, styles.cloudRight]}>
        <Text style={[styles.messageLabel, styles.messageMe]}>{message}</Text>
      </View>
    </View>
  );
}

export default memo(BalloonRight, IsEqual);
