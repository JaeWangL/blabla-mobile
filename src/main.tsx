import AppLoading from 'expo-app-loading';
import * as Localization from 'expo-localization';
import { useAssets } from 'expo-asset';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import i18n from 'i18n-js';
import { useEffect, Suspense } from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { RootNavigator } from './navigation/root_navigator';
import './i18n';

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
    <SafeAreaProvider>
      <Suspense fallback={<AppLoading />}>
        <RootNavigator />
      </Suspense>
    </SafeAreaProvider>
  );
}

function Main(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <AppearanceProvider>
          <StatusBar style="auto" translucent />
          <App />
        </AppearanceProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default Main;
