import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  mapWrapper: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
