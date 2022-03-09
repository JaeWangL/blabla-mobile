import { StyleSheet } from 'react-native';
import { defaultTheme } from '@/themes';

export const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 24,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    height: 120,
    shadowColor: 'black',
    // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 2,

    // Android
    elevation: 2,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  thumbnailImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  contentsContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    color: defaultTheme.titleDefault,
    fontFamily: 'PretendardBold',
  },
  contents: {
    fontSize: 16,
    paddingTop: 4,
    color: defaultTheme.descDefault,
    fontFamily: 'PretendardRegular',
  },
  captionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  captionContentContainer: {
    flexDirection: 'row',
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
});
