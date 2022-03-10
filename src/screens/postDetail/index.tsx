import { memo, useCallback } from 'react';
import IsEqual from 'react-fast-compare';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { AnimatedImage, Button } from 'react-native-ui-lib';
import { useQuery } from 'react-query';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute, CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { queryKeys } from '@/configs/api_keys';
import { ArchivesParamsList, PermissionedParamsList, ScreenTypes } from '@/configs/screen_types';
import { getPostById } from '@/services/posts_service';
import { styles } from './styles';

type ScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<PermissionedParamsList, ScreenTypes.STACK_ARCHIVES>,
  StackNavigationProp<ArchivesParamsList>
>;

type ScreenRouteProps = RouteProp<ArchivesParamsList, ScreenTypes.ARCHIVES_POST_DETAIL>;

function PostDetailScreen(): JSX.Element {
  const route = useRoute<ScreenRouteProps>();
  const navigation = useNavigation<ScreenNavigationProps>();
  const { post } = route.params;
  const {
    isLoading,
    error,
    data: postData,
  } = useQuery(`${queryKeys.postsByDistance}_${post.id}`, () => getPostById(post.id));

  const onGoToChatPress = useCallback((): void => {
    navigation.navigate(ScreenTypes.ARCHIVES_POST_CHAT, { post });
  }, []);

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
    <ScrollView>
      <AnimatedImage style={styles.thumbnail} source={{ uri: postData.thumbnailUrl }} loader={<ActivityIndicator />} />
      <Button label="Go To Chat" onPress={onGoToChatPress} />
      {postData.thumbnailUrl ? <Text>{postData.thumbnailUrl}</Text> : null}
      <Text>{postData.title}</Text>
      <Text>{postData.contents}</Text>
    </ScrollView>
  );
}

export default memo(PostDetailScreen, IsEqual);
