import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { useRoute, RouteProp } from '@react-navigation/native';
import { queryKeys } from '@/configs/api_keys';
import { ArchivesParamsList, ScreenTypes } from '@/configs/screen_types';
import { getPostById } from '@/services/posts_service';
import { styles } from './styles';

type ScreenRouteProps = RouteProp<ArchivesParamsList, ScreenTypes.ARCHIVES_POST_DETAIL>;

function PostDetailScreen(): JSX.Element {
  const route = useRoute<ScreenRouteProps>();
  const { post } = route.params;
  const {
    isLoading,
    error,
    data: postData,
  } = useQuery(`${queryKeys.postsByDistance}_${post.id}`, () => getPostById(post.id));

  if (isLoading || !postData) {
    return (
      <View style={styles.wrapper}>
        <Text>Loading ...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.wrapper}>
        <Text>Error!!</Text>
      </View>
    );
  }
  return (
    <View style={styles.wrapper}>
      {postData.thumbnailUrl ? <Text>{postData.thumbnailUrl}</Text> : null}
      <Text>{postData.title}</Text>
      <Text>{postData.contents}</Text>
    </View>
  );
}

export default memo(PostDetailScreen, IsEqual);
