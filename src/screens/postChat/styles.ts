import { StyleSheet } from 'react-native';
import { colors } from '@/themes';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  messageListContent: {
    marginHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: colors.gray300,
  },
  inputfieldContainer: {
    paddingLeft: 12,
  },
  buttonSend: {
    width: 60,
    height: 60,
    borderRadius: 0,
  },
});
