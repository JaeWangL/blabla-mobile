import { Dimensions, StyleSheet } from 'react-native';
import { defaultTheme } from '@/themes';

export const styles = StyleSheet.create({
  balloonMe: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 6,
  },
  balloonOthers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cloudContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  triangle: {
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    backgroundColor: 'transparent',
  },
  triangleLeft: {
    transform: [{ rotate: '-90deg' }],
    borderBottomColor: defaultTheme.secondary,
  },
  triangleRight: {
    transform: [{ rotate: '90deg' }],
    borderBottomColor: defaultTheme.primary,
  },
  cloud: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    maxWidth: Dimensions.get('window').width - 120,
  },
  cloudLeft: {
    left: -3,
    backgroundColor: defaultTheme.secondary,
    marginRight: 16,
  },
  cloudRight: {
    left: 3,
    backgroundColor: defaultTheme.primary,
    marginLeft: 16,
  },
  dateLabel: {
    fontSize: 12,
    color: defaultTheme.captionDefault,
    fontFamily: 'PretendardRegular',
  },
});
