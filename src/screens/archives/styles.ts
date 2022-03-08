import { StatusBar, StyleSheet } from 'react-native';
import { defaultTheme } from '@/themes';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: defaultTheme.backgroundDefault,
    marginTop: StatusBar.currentHeight || 0,
  },
});
