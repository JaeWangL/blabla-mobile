import { StyleSheet } from 'react-native';
import { colors } from '@/themes';

export const styles = StyleSheet.create({
  inputContainer: {
    padding: 12,
    backgroundColor: colors.gray400,
  },
  buttonSend: {
    width: 80,
    height: 40,
  },
  buttonSendLabel: {
    fontSize: 14,
    fontFamily: 'PretendardRegular',
  },
});
