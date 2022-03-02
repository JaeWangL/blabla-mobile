import { memo, useCallback } from 'react';
import IsEqual from 'react-fast-compare';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { queryKeys } from '@/configs/api_keys';
import { getPostsByDistance } from '@/services/posts_service';
import { locationAtom } from '@/recoils/location_states';
import ArchiveItem from './archiveItem';
import { styles } from './styles';

function ArchivesScreen(): JSX.Element {
  const locations = useRecoilValue(locationAtom);
  const {
    isLoading,
    error,
    data: postsData,
  } = useQuery(queryKeys.postsByDistance, () => getPostsByDistance(locations.latitude, locations.longitude));

  const renderItem = useCallback(({ item }) => <ArchiveItem item={item} />, []);

  if (isLoading) {
    <View style={styles.wrapper}>
      <Text>Loading ...</Text>
    </View>;
  }
  if (error) {
    <View style={styles.wrapper}>
      <Text>Error!!</Text>
    </View>;
  }
  return (
    <SafeAreaView style={styles.wrapper}>
      <FlatList data={postsData} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </SafeAreaView>
  );
}

export default memo(ArchivesScreen, IsEqual);
