import DayJS from 'dayjs';
import { memo, useCallback } from 'react';
import IsEqual from 'react-fast-compare';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import IcChat from '@assets/icons/ic_chat.svg';
import { ArchivesParamsList, PermissionedParamsList, ScreenTypes } from '@/configs/screen_types';
import { PostPreviewDTO } from '@/dtos/post_dtos';
import { styles } from './styles';

type ScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<PermissionedParamsList, ScreenTypes.STACK_ARCHIVES>,
  StackNavigationProp<ArchivesParamsList>
>;

type ArchiveItemProps = {
  item: PostPreviewDTO;
};
function ArchiveItem(props: ArchiveItemProps): JSX.Element {
  const { item } = props;
  const navigation = useNavigation<ScreenNavigationProps>();

  const onPress = useCallback((): void => {
    navigation.navigate(ScreenTypes.ARCHIVES_POST_DETAIL, {
      post: item,
    });
  }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Image
            source={{
              uri: item.thumbnailUrl,
            }}
            style={styles.thumbnailImage}
            resizeMode="cover"
          />
          <View style={styles.contentsContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
            <Text numberOfLines={1} style={styles.contents}>
              {item.contentsSnippet}
            </Text>
            <View style={styles.captionContainer}>
              <View style={styles.captionContentContainer}>
                <Text style={styles.distance}>{item.distanceM}M</Text>
                <Text style={styles.captionLabel}>{` · ${DayJS().diff(item.createdAt, 'hour')}시간 전`}</Text>
              </View>
              <View style={styles.captionContentContainer}>
                <IcChat width={16} height={16} />
                <Text style={styles.captionLabel}>{item.joinedUsers}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(ArchiveItem, IsEqual);
