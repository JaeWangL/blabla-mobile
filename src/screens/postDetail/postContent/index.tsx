import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { Text, View } from 'react-native';
import { PostDetailDTO } from '@/dtos/post_dtos';

type PostContentProps = {
  post: PostDetailDTO;
};

function PostContent(props: PostContentProps): JSX.Element {
  const { post } = props;

  return (
    <View>
      {post.thumbnailUrl ? <Text>{post.thumbnailUrl}</Text> : null}
      <Text>{post.title}</Text>
      <Text>{post.contents}</Text>
    </View>
  );
}

export default memo(PostContent, IsEqual);
