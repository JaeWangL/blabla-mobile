import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { Text, View } from 'react-native';
import { styles } from './styles';

function HomeScreen(): JSX.Element {
  return (
    <View style={styles.wrapper}>
      <Text>Home</Text>
    </View>
  );
}

export default memo(HomeScreen, IsEqual);
