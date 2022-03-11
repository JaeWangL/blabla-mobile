import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { View } from 'react-native-ui-lib';

type DividerProps = {
  color?: string;
  height?: number;
  margin?: number;
};

function Divider(props: DividerProps): JSX.Element {
  const { color, height, margin } = props;

  return <View style={{ backgroundColor: color, height, margin }} />;
}

Divider.defaultProps = {
  color: '#DDDDDD',
  height: 1,
  margin: 0,
} as DividerProps;

export default memo(Divider, IsEqual);
