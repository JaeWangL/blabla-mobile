import { memo, useEffect, useState } from 'react';
import IsEqual from 'react-fast-compare';
import { KeyboardAvoidingView, NativeModules, Platform, ScrollView } from 'react-native';
import { styles } from './styles';

type KeyboardAwareScrollViewProps = {
  children: JSX.Element;
  useScroll?: boolean;
};

const { StatusBarManager } = NativeModules;

function KeyboardAwareScrollView(props: KeyboardAwareScrollViewProps): JSX.Element {
  const { children, useScroll } = props;
  const [verticalOffset, setVerticalOffset] = useState<number>(0);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      // @ts-ignore
      StatusBarManager.getHeight((statusBarFrameData) => {
        setVerticalOffset(statusBarFrameData.height + 44);
      });
    }
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.wrapper} keyboardVerticalOffset={verticalOffset}>
      {useScroll ? <ScrollView>{children}</ScrollView> : children}
    </KeyboardAvoidingView>
  );
}

KeyboardAwareScrollView.defaultProps = {
  useScroll: false,
} as KeyboardAwareScrollViewProps;

export default memo(KeyboardAwareScrollView, IsEqual);
