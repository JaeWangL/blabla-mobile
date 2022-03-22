import { StyleSheet } from 'react-native';
import { defaultTheme } from '@/themes';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 128,
    height: 128,
  },
  text: {
    paddingTop: 12,
    fontSize: 20,
    color: defaultTheme.captionDefault,
    fontFamily: 'PretendardBold',
  },
});
