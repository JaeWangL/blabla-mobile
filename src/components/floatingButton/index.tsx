import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { defaultTheme } from '@/themes';
import { styles } from './styles';

type FloatingButtonProps = {
  onPress: () => void;
  size?: number;
  backgroundColor?: string;
  offset?: number;
};

function FloatingButton(props: FloatingButtonProps): JSX.Element {
  const { backgroundColor, offset, size, onPress } = props;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderRadius: size! / 2,
          bottom: offset!,
          right: offset!,
        },
      ]}
      onPress={onPress}
    >
      <Animated.View
        style={[
          styles.fabButton,
          {
            width: size!,
            height: size!,
            borderRadius: size! / 2,
            backgroundColor: backgroundColor!,
          },
        ]}
      >
        <Animated.Text style={styles.text}>+</Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

FloatingButton.defaultProps = {
  size: 60,
  backgroundColor: defaultTheme.primary,
  offset: 24,
} as FloatingButtonProps;

export default memo(FloatingButton, IsEqual);
