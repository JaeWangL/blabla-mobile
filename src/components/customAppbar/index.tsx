import { memo, useCallback, useMemo } from 'react';
import IsEqual from 'react-fast-compare';
import { Text, TouchableOpacity, View, ViewProps } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import IcArrowLeft from '@assets/icons/ic_arrow_left.svg';
import IcArrowLeftWhite from '@assets/icons/ic_arrow_left_white.svg';
import Divider from '../divider';
import { styles } from './styles';

type AlignmentProp = 'start' | 'center';

const getBackgroundColor = (transparent?: boolean) => {
  if (transparent) {
    return { backgroundColor: 'transparent' };
  }
  return { backgroundColor: 'white' };
};

const getAlignmentDependentStyles = (alignment: AlignmentProp) => {
  if (alignment === 'center') {
    return {
      container: styles.containerCentered,
      titleContainer: styles.titleContainerCentered,
    };
  }

  return {
    rightControlsContainer: styles.rightControlsContainerStart,
  };
};

type CustomAppBarProps = {
  title: string;
  subtitle?: string;
  accessoryLeft?: JSX.Element;
  accessoryRight?: JSX.Element;
  alignment?: AlignmentProp;
  transparent?: boolean;
  goBack?: boolean;
} & ViewProps;

function CustomAppBar(props: CustomAppBarProps): JSX.Element {
  const { accessoryLeft, accessoryRight, alignment, goBack, subtitle, title, transparent, style } = props;
  const navigation = useNavigation();
  const alignmentStyles = useMemo(() => getAlignmentDependentStyles(alignment!), []);
  const backgroundStyles = useMemo(() => getBackgroundColor(transparent!), []);

  const onBackButtonPress = useCallback((): void => {
    if (goBack && navigation.canGoBack()) {
      navigation.goBack();
    }
  }, []);

  const renderLeftControl = useCallback((): JSX.Element | null => {
    if (goBack) {
      return (
        <TouchableOpacity style={styles.backButton} onPress={onBackButtonPress}>
          {transparent ? <IcArrowLeftWhite width={32} height={32} /> : <IcArrowLeft width={32} height={32} />}
        </TouchableOpacity>
      );
    }
    if (accessoryLeft) {
      return accessoryLeft;
    }

    return null;
  }, []);

  return (
    <>
      <View style={[styles.container, alignmentStyles.container, backgroundStyles, style]}>
        <View style={styles.leftControlContainer}>{renderLeftControl()}</View>
        <View style={alignmentStyles.titleContainer || styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        <View style={[styles.rightControlsContainer, alignmentStyles.rightControlsContainer]}>
          {accessoryRight && accessoryRight}
        </View>
      </View>
      {!transparent && <Divider />}
    </>
  );
}

CustomAppBar.defaultProps = {
  subtitle: undefined,
  accessoryLeft: undefined,
  accessoryRight: undefined,
  alignment: 'start',
  transparent: false,
  goBack: false,
} as CustomAppBarProps;

export default memo(CustomAppBar, IsEqual);
