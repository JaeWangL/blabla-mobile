import DayJS from 'dayjs';
import { memo, useCallback } from 'react';
import IsEqual from 'react-fast-compare';
import { ActivityIndicator, ScrollView } from 'react-native';
import { Avatar, AnimatedImage, Button, Text, View } from 'react-native-ui-lib';
import { useQuery } from 'react-query';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute, CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import IcChat from '@assets/icons/ic_chat.svg';
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
    <View style={styles.wrapper}>
      <ScrollView>
        <AnimatedImage
          style={styles.thumbnail}
          source={{ uri: postData.thumbnailUrl }}
          loader={<ActivityIndicator />}
        />
        <View style={styles.avatarContainer}>
          <View style={styles.profileContainer}>
            <Avatar
              source={{
                uri: 'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg',
              }}
            />
            <Text style={styles.avatarName}>테스트 닉네임</Text>
          </View>
          <View style={styles.captionContainer}>
            <Text style={styles.distance}>15M</Text>
            <Text style={styles.createdTime}>{` · ${DayJS().diff(postData.createdAt, 'hour')}시간 전`}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{postData.title}</Text>
          <Text style={styles.contents}>{postData.contents}</Text>
        </View>
      </ScrollView>
      <View style={styles.gotoChatContainer}>
        <View style={styles.chatDescContainer}>
          <IcChat width={16} height={16} />
          <Text style={styles.createdTime}>{`현재 ${postData.joinedUsers}명이 채팅방에 참여 중입니다.`}</Text>
        </View>
        <Button
          avoidInnerPadding
          style={styles.chatButton}
          labelStyle={styles.chatButtonLabel}
          label="채팅 참여하기"
          onPress={onGoToChatPress}
        />
      </View>
    </View>
  );
}

export default memo(PostDetailScreen, IsEqual);
