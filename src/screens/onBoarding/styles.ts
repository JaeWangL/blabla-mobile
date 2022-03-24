import { StyleSheet } from 'react-native';
import { colors, defaultTheme } from '@/themes';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: defaultTheme.primary,
    justifyContent: 'space-between',
  },
  dummy: {
    height: 60,
  },
  lottie: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    backgroundColor: 'transparent',
  },
  label: {
    marginTop: -40,
    fontSize: 14,
    fontFamily: 'PretendardRegular',
    color: colors.gray400,
    lineHeight: 20,
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 12,
    paddingVertical: 18,
    backgroundColor: 'white',
  },
  buttonLabel: {
    fontSize: 18,
    fontFamily: 'PretendardBold',
    color: defaultTheme.titleDefault,
  },
});
