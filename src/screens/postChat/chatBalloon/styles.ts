import { Dimensions, StyleSheet } from 'react-native';
import { colors, defaultTheme } from '@/themes';

export const styles = StyleSheet.create({
  balloon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  me: {
    justifyContent: 'flex-end',
  },
  others: {
    justifyContent: 'flex-start',
  },
  cloudContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    maxWidth: Dimensions.get('window').width - 120,
  },
  cloudLeft: {
    left: -3,
    backgroundColor: colors.gray300,
    marginRight: 4,
  },
  cloudRight: {
    left: 3,
    backgroundColor: defaultTheme.primary,
    marginLeft: 4,
  },
  nickName: {
    paddingTop: 6,
    fontSize: 14,
    fontFamily: 'PretendardBold',
  },
  messageLabel: {
    fontSize: 14,
    fontFamily: 'PretendardRegular',
  },
  messageOthers: {
    color: defaultTheme.titleDefault,
  },
  messageMe: {
    color: 'white',
  },
  dateLabel: {
    fontSize: 12,
    color: defaultTheme.captionDefault,
    fontFamily: 'PretendardRegular',
  },
});
