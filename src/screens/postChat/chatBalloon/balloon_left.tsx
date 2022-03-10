import DayJS from 'dayjs';
import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { Text, View } from 'react-native-ui-lib';
import { styles } from './styles';

type BalloonLeftProps = {
  message: string;
};

function BalloonLeft(props: BalloonLeftProps): JSX.Element {
  const { message } = props;

  return (
    <View style={styles.balloonOthers}>
      <View style={styles.cloudContainer}>
        <View style={[styles.triangle, styles.triangleLeft]} />
        <View style={[styles.cloud, styles.cloudLeft]}>
          <Text>{message}</Text>
        </View>
      </View>
      <Text style={styles.dateLabel}>{DayJS(new Date()).format('YYYY-MM-DD')}</Text>
    </View>
  );
}

export default memo(BalloonLeft, IsEqual);
