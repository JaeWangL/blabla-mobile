import { StyleSheet } from 'react-native';
import { defaultTheme } from '@/themes';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  writeButton: {
    fontSize: 18,
    color: defaultTheme.primary,
    fontFamily: 'PretendardBold',
  },
  contentContainer: {
    marginHorizontal: 20,
  },
  withBorderRadius: {
    borderRadius: 12,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    paddingVertical: 24,
  },
  thumbnail: {
    resizeMode: 'cover',
    width: 72,
    height: 72,
    paddingVertical: 24,
  },
  thumbnailRemoveBadge: {
    position: 'absolute',
    right: -4,
    top: -4,
  },
  thumbnailCloseIcon: {
    width: 14,
    height: 14,
  },
  thumbnailLoader: {
    marginLeft: 24,
  },
  inputContainer: {
    paddingTop: 18,
  },
  caption: {
    fontSize: 14,
    color: defaultTheme.descDefault,
    fontFamily: 'PretendardRegular',
  },
});
