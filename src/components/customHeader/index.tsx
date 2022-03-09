import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { Text } from 'react-native';
import { styles } from './styles';

type CustomHeaderProps = {
  title: string;
};
function CustomHeader(props: CustomHeaderProps): JSX.Element {
  const { title } = props;

  return <Text style={styles.title}>{title}</Text>;
}

export default memo(CustomHeader, IsEqual);
