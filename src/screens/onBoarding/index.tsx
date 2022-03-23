import * as Location from 'expo-location';
import LottieView from 'lottie-react-native';
import { memo, useCallback, useEffect, useRef } from 'react';
import IsEqual from 'react-fast-compare';
import { Alert } from 'react-native';
import { Button, View } from 'react-native-ui-lib';
import { useRecoilState } from 'recoil';
import OnboardLottie from '@assets/lotties/onboard.json';
import { settingsAtom } from '@/recoils/settings_states';
import { styles } from './styles';

function OnBoardingScreen(): JSX.Element {
  const [settings, setSettings] = useRecoilState(settingsAtom);
  const lottieRef = useRef<LottieView | null>(null);

  useEffect(() => {
    lottieRef.current?.play();

    return () => {
      lottieRef.current?.reset();
    };
  }, []);

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
      <View style={styles.dummy} />
      <LottieView ref={lottieRef} style={styles.lottie} source={OnboardLottie} />
      <Button
        style={styles.button}
        labelStyle={styles.buttonLabel}
        fullWidth
        label="Accept Permissions"
        onPress={onAcceptPress}
      />
    </View>
  );
}

export default memo(OnBoardingScreen, IsEqual);
