import DayJS from 'dayjs';
import { memo, useCallback } from 'react';
import IsEqual from 'react-fast-compare';
import { ActivityIndicator, ScrollView } from 'react-native';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, AnimatedImage, Button, Text, View } from 'react-native-ui-lib';
import { useQuery } from 'react-query';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute, CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import IcChat from '@assets/icons/ic_chat.svg';
import { APPBAR_HEIGHT } from '@/themes';
import CustomAppBar from '@/components/customAppbar';
import { queryKeys } from '@/configs/api_keys';
import { ArchivesParamsList, PermissionedParamsList, ScreenTypes } from '@/configs/screen_types';
import { getPostById } from '@/services/posts_service';
import { styles } from './styles';

type ScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<PermissionedParamsList, ScreenTypes.STACK_ARCHIVES>,
  StackNavigationProp<ArchivesParamsList>
>;

type ScreenRouteProps = RouteProp<ArchivesParamsList, ScreenTypes.SHARED_POST_DETAIL>;

function PostDetailScreen(): JSX.Element {
  const route = useRoute<ScreenRouteProps>();
  const navigation = useNavigation<ScreenNavigationProps>();
  const { post } = route.params;
  const insets = useSafeAreaInsets();
  const {
    isLoading,
    error,
    data: postData,
  } = useQuery(`${queryKeys.postsByDistance}_${post.id}`, () => getPostById(post.id));

  const onGoToChatPress = useCallback((): void => {
    navigation.navigate(ScreenTypes.SHARED_POST_CHAT, { post });
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
    <SafeAreaView style={styles.wrapper}>
      <CustomAppBar title="" transparent goBack />
      <ScrollView style={{ marginTop: -(insets.top + APPBAR_HEIGHT) }}>
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
            <Text style={styles.avatarName}>????????? ?????????</Text>
          </View>
          <View style={styles.captionContainer}>
            <Text style={styles.distance}>{post.distanceM}M</Text>
            <Text style={styles.createdTime}>{` ?? ${DayJS().diff(postData.createdAt, 'hour')}?????? ???`}</Text>
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
          <Text style={styles.createdTime}>{`?????? ${postData.joinedUsers}?????? ???????????? ?????? ????????????.`}</Text>
        </View>
        <Button
          avoidInnerPadding
          style={styles.chatButton}
          labelStyle={styles.chatButtonLabel}
          label="?????? ????????????"
          onPress={onGoToChatPress}
        />
      </View>
    </SafeAreaView>
  );
}

export default memo(PostDetailScreen, IsEqual);
