import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { RootNavigator } from './navigation/root_navigator';

const queryClient = new QueryClient();

export function Main(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <AppearanceProvider>
          <StatusBar style="auto" />
          <React.Suspense fallback={<AppLoading />}>
            <RootNavigator />
          </React.Suspense>
        </AppearanceProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default Main;
