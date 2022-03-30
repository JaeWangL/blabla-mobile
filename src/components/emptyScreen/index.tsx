import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { AnimatedImage, Text, View } from 'react-native-ui-lib';
import ImgEmpty from '@assets/images/img_empty.png';
import { translate } from '@/i18n';
import { styles } from './styles';

function EmptyScreen(): JSX.Element {
  return (
    <View style={styles.wrapper}>
      <AnimatedImage style={styles.icon} source={ImgEmpty} />
      <Text style={styles.text}>{translate('common.noData')}</Text>
    </View>
  );
}

export default memo(EmptyScreen, IsEqual);
