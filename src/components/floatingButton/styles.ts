import { StyleSheet } from 'react-native';
import { zIndices } from '@/themes';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: zIndices.floatingButton,
  },
  fabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 36,
    color: '#EFFBFA',
  },
});
