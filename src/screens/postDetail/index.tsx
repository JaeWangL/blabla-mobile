import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { Text, View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { ArchivesParamsList, ScreenTypes } from '@/configs/screen_types';
import { styles } from './styles';

type ScreenRouteProps = RouteProp<ArchivesParamsList, ScreenTypes.ARCHIVE_POST_DETAIL>;

function PostDetailScreen(): JSX.Element {
  const route = useRoute<ScreenRouteProps>();
  const { post } = route.params;

  return (
    <View style={styles.wrapper}>
      <Text>{post.title}</Text>
    </View>
  );
}

export default memo(PostDetailScreen, IsEqual);
