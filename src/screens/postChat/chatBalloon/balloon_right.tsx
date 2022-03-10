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
    <View style={styles.balloonMe}>
      <Text style={styles.dateLabel}>{DayJS(new Date()).format('YYYY-MM-DD')}</Text>
      <View style={styles.cloudContainer}>
        <View style={[styles.cloud, styles.cloudRight]}>
          <Text>{message}</Text>
        </View>
        <View style={[styles.triangle, styles.triangleRight]} />
      </View>
    </View>
  );
}

export default memo(BalloonRight, IsEqual);
