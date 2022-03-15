import AppLoading from 'expo-app-loading';
import { useAssets } from 'expo-asset';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, Suspense } from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StompSessionProvider } from 'react-stomp-hooks';
import { RecoilRoot } from 'recoil';
import SockJS from 'sockjs-client';
import { apiKeys } from './configs/api_keys';
import { RootNavigator } from './navigation/root_navigator';

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

function App(): JSX.Element {
  const [fontsLoaded] = useFonts({
    /* eslint-disable global-require */
    PretendardBold: require('../assets/fonts/Pretendard-Bold.ttf'),
    PretendardExtraBold: require('../assets/fonts/Pretendard-ExtraBold.ttf'),
    PretendardRegular: require('../assets/fonts/Pretendard-Regular.ttf'),
    /* eslint-enable */
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <StompSessionProvider
      url={apiKeys.locationsStomp}
      reconnectDelay={5000}
      heartbeatIncoming={4000}
      heartbeatOutgoing={4000}
      webSocketFactory={() => {
        return new SockJS(apiKeys.locationsSockJS);
      }}
    >
      <SafeAreaProvider>
        <Suspense fallback={<AppLoading />}>
          <RootNavigator />
        </Suspense>
      </SafeAreaProvider>
    </StompSessionProvider>
  );
}

function Main(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <AppearanceProvider>
          <StatusBar style="auto" />
          <App />
        </AppearanceProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default Main;
