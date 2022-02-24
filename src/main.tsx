import { StatusBar } from "expo-status-bar"
import { AppearanceProvider } from 'react-native-appearance';
import { MainNavigation } from './navigation/main_navigation';

export function main() {
    return (
      <AppearanceProvider>
        <StatusBar style="auto" />
        <MainNavigation />
      </AppearanceProvider>
    )
  }

export default main;
