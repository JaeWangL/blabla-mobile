import { StyleSheet } from 'react-native';
import { defaultTheme } from '@/themes';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  textWrapper: {
    padding: 24,
  },
  text: {
    fontSize: 16,
    color: defaultTheme.titleDefault,
    fontFamily: 'PretendardRegular',
  },
});
