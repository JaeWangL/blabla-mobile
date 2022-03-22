import { StyleSheet } from 'react-native';
import { defaultTheme } from '@/themes';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  deafultSpacing: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groupLabel: {
    fontSize: 16,
    fontFamily: 'PretendardRegular',
    color: defaultTheme.descDark,
  },
  textLabel: {
    fontSize: 18,
    fontFamily: 'PretendardRegular',
    color: defaultTheme.titleDefault,
  },
});
