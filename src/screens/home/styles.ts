import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mapWrapper: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
