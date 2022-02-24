import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { RecoilRoot } from 'recoil';
import { RootNavigator } from './navigation/root_navigator';

export function Main(): JSX.Element {
  return (
    <RecoilRoot>
      <AppearanceProvider>
        <StatusBar style="auto" />
        <React.Suspense fallback={<AppLoading />}>
          <RootNavigator />
        </React.Suspense>
      </AppearanceProvider>
    </RecoilRoot>
  );
}

export default Main;
