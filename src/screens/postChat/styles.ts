import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  balloonMe: {
    alignSelf: 'flex-end',
  },
  balloonOthers: {
    alignSelf: 'flex-start',
  },
  inputContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonSend: {
    width: 80,
    height: 40,
  },
});
