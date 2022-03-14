import { StyleSheet } from 'react-native';
import { zIndices, APPBAR_HEIGHT } from '@/themes';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: APPBAR_HEIGHT,
    zIndex: zIndices.appbar,
  },
  containerCentered: {
    justifyContent: 'space-between',
  },
  backButton: {
    paddingRight: 12,
  },
  title: {
    fontSize: 20,
    fontFamily: 'PretendardBold',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'PretendardRegular',
  },
  titleContainerCentered: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  leftControlContainer: {
    flexDirection: 'row',
    zIndex: 1,
    marginLeft: 12,
  },
  rightControlsContainer: {
    flexDirection: 'row',
    zIndex: 1,
    marginRight: 12,
  },
  rightControlsContainerStart: {
    flex: 0,
    justifyContent: 'flex-end',
  },
});
