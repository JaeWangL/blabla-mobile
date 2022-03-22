import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { AnimatedImage, Text, View } from 'react-native-ui-lib';
import ImgEmpty from '@assets/images/img_empty.png';
import { styles } from './styles';

function EmptyScreen(): JSX.Element {
  return (
    <View style={styles.wrapper}>
      <AnimatedImage style={styles.icon} source={ImgEmpty} s />
      <Text style={styles.text}>표시할 데이터가 없습니다</Text>
    </View>
  );
}

export default memo(EmptyScreen, IsEqual);
