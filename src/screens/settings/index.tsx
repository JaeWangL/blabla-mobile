import Constants from 'expo-constants';
import { memo, useCallback } from 'react';
import IsEqual from 'react-fast-compare';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomHeader from '@/components/customHeader';
import { PermissionedParamsList, ScreenTypes, SettingsParamsList } from '@/configs/screen_types';
import { styles } from './styles';

type ScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<PermissionedParamsList, ScreenTypes.STACK_SETTINGS>,
  StackNavigationProp<SettingsParamsList>
>;

function SettingsScreen(): JSX.Element {
  const navigation = useNavigation<ScreenNavigationProps>();

  const onDevelopersPress = useCallback((): void => {
    navigation.navigate(ScreenTypes.INFO_DEVELOPERS);
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <CustomHeader title="Settings" />
      <Text style={[styles.deafultSpacing, styles.groupLabel]}>앱 정보</Text>
      <View style={[styles.deafultSpacing, styles.flexRow]}>
        <Text style={[styles.textLabel]}>앱 버전 확인</Text>
        <Text style={[styles.groupLabel]}>{Constants.manifest?.version}</Text>
      </View>
      <TouchableOpacity onPress={onDevelopersPress}>
        <Text style={[styles.deafultSpacing, styles.textLabel]}>개발자 정보</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default memo(SettingsScreen, IsEqual);
