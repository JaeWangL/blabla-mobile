import * as Location from 'expo-location';
import { memo, useCallback } from 'react';
import IsEqual from 'react-fast-compare';
import { Alert, Button, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { settingsAtom } from '@/recoils/settings_states';
import { styles } from './styles';

function OnBoardingScreen(): JSX.Element {
  const [settings, setSettings] = useRecoilState(settingsAtom);

  const onAcceptPress = useCallback(async (): Promise<void> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You have to accept location permissions.', [{ text: 'OK' }]);
      return;
    }

    setSettings({
      ...settings,
      hasPermissions: true,
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      <Button title="Accept Permissions" onPress={onAcceptPress} />
    </View>
  );
}

export default memo(OnBoardingScreen, IsEqual);
