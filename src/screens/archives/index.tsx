import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { Text, View } from 'react-native';
import { styles } from './styles';

function ArchivesScreen(): JSX.Element {
  return (
    <View style={styles.wrapper}>
      <Text>Archives</Text>
    </View>
  );
}

export default memo(ArchivesScreen, IsEqual);
