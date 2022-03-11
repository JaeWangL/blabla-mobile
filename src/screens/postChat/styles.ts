import { StyleSheet } from 'react-native';
import { colors } from '@/themes';

export const styles = StyleSheet.create({
  messageListContent: {
    marginHorizontal: 20,
  },
  inputContainer: {
    paddingLeft: 12,
    backgroundColor: colors.gray300,
  },
  buttonSend: {
    width: 60,
    height: 60,
    borderRadius: 0,
  },
});
