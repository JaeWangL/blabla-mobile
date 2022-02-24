import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { Text, View } from 'react-native';
import { styles } from './styles';

function SettingsScreen(): JSX.Element {
  return (
    <View style={styles.wrapper}>
      <Text>Settings</Text>
    </View>
  );
}

export default memo(SettingsScreen, IsEqual);
