import { StyleSheet } from 'react-native';
import { defaultTheme } from '@/themes';

const PADDING_HORIZONTAL = 20;

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  thumbnail: {
    resizeMode: 'cover',
    height: 250,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  divider: {
    height: 1,
    backgroundColor: '#DDDDDD',
    marginHorizontal: PADDING_HORIZONTAL,
  },
  avatarName: {
    fontSize: 16,
    paddingLeft: 8,
    color: defaultTheme.titleDefault,
    fontFamily: 'PretendardBold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    fontSize: 14,
    color: defaultTheme.primary,
    fontFamily: 'PretendardBold',
  },
  createdTime: {
    fontSize: 14,
    color: defaultTheme.captionDefault,
    fontFamily: 'PretendardRegular',
  },
  contentContainer: {
    paddingVertical: 12,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  title: {
    fontSize: 18,
    color: defaultTheme.titleDefault,
    fontFamily: 'PretendardBold',
    paddingBottom: 12,
  },
  contents: {
    fontSize: 16,
    paddingTop: 4,
    color: defaultTheme.descDark,
    fontFamily: 'PretendardRegular',
  },
  gotoChatContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 18,
    borderTopColor: '#DDDDDD',
    borderBottomColor: '#DDDDDD',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  chatDescContainer: {
    flexDirection: 'row',
  },
  chatButton: {
    width: 98,
    height: 32,
  },
  chatButtonLabel: {
    fontSize: 12,
    fontFamily: 'PretendardRegular',
  },
});
