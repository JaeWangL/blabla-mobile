import { memo, useCallback } from 'react';
import IsEqual from 'react-fast-compare';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { PostPreviewDTO } from '@/dtos/post_dtos';
import { styles } from './styles';

type ArchiveItemProps = {
  item: PostPreviewDTO;
};
function ArchiveItem(props: ArchiveItemProps): JSX.Element {
  const { item } = props;

  const onPress = useCallback((): void => {
    // TODO
  }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.thumbnailUrl,
            }}
            style={styles.thumbnailImage}
            resizeMode="cover"
          />
          <Text style={styles.thumbnailAddress}>부산진구</Text>
        </View>
        <View style={styles.contentsContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={styles.contents}>
            {item.contentsSnippet}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(ArchiveItem, IsEqual);
