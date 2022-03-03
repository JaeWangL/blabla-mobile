import Toast from 'react-native-toast-message';
import { enableScreens } from 'react-native-screens';
import { useRecoilValue } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenTypes, RootStackParamList } from '@/configs/screen_types';
import { settingsAtom } from '@/recoils/settings_states';
import { PermissionedNavigator } from './permissoned_navigator';
import { UnPermissionedNavigator } from './un_permissoned_navigator';

enableScreens();

const RootStack = createStackNavigator<RootStackParamList>();

export function RootNavigator(): JSX.Element {
  const settings = useRecoilValue(settingsAtom);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!settings.hasPermissions ? (
          <RootStack.Screen
            options={{ animationTypeForReplace: 'pop', gestureEnabled: false }}
            name={ScreenTypes.STACK_UN_PERMISSIONED}
            component={UnPermissionedNavigator}
          />
        ) : (
          <RootStack.Screen
            options={{ gestureEnabled: false }}
            name={ScreenTypes.STACK_PERMISSIONED}
            component={PermissionedNavigator}
          />
        )}
      </RootStack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
