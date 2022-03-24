import * as Location from 'expo-location';
import LottieView from 'lottie-react-native';
import { memo, useCallback } from 'react';
import IsEqual from 'react-fast-compare';
import { Alert } from 'react-native';
import { Button, Text, View } from 'react-native-ui-lib';
import { useRecoilState } from 'recoil';
import OnboardLottie from '@assets/lotties/onboard.json';
import { translate } from '@/i18n';
import { settingsAtom } from '@/recoils/settings_states';
import { styles } from './styles';

function OnBoardingScreen(): JSX.Element {
  const [settings, setSettings] = useRecoilState(settingsAtom);

  const onAcceptPress = useCallback(async (): Promise<void> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(translate('dialogs.permissionDeniedTitle'), translate('dialogs.permissionRequestLocation'), [
        { text: translate('common.ok') },
      ]);
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
      <View>
        <LottieView style={styles.lottie} source={OnboardLottie} autoPlay />
        <Text style={styles.label}>
          {`
왁자지껄은 위치기반 SNS 입니다
사용자의 위치정보를 알 수 있도록 위치권한을 허용해 주세요
어떠한 사용자의 데이터도 수집되지 않습니다
            `}
        </Text>
      </View>
      <Button
        style={styles.button}
        labelStyle={styles.buttonLabel}
        fullWidth
        label={translate('button.acceptPermissionLocation')}
        onPress={onAcceptPress}
      />
    </View>
  );
}

export default memo(OnBoardingScreen, IsEqual);
