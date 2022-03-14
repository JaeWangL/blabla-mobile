import { memo, useCallback } from 'react';
import IsEqual from 'react-fast-compare';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomHeader from '@/components/customHeader';
import FloatingButton from '@/components/floatingButton';
import { ArchivesParamsList, PermissionedParamsList, ScreenTypes } from '@/configs/screen_types';
import { queryKeys } from '@/configs/api_keys';
import { getPostsByDistance } from '@/services/posts_service';
import { locationAtom } from '@/recoils/location_states';
import ArchiveItem from './archiveItem';
import { styles } from './styles';

type ScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<PermissionedParamsList, ScreenTypes.STACK_ARCHIVES>,
  StackNavigationProp<ArchivesParamsList>
>;

function ArchivesScreen(): JSX.Element {
  const locations = useRecoilValue(locationAtom);
  const navigation = useNavigation<ScreenNavigationProps>();
  const {
    isLoading,
    error,
    data: postsData,
  } = useQuery(queryKeys.postsByDistance, () => getPostsByDistance(locations.latitude, locations.longitude));

  const onFABPress = useCallback((): void => {
    navigation.navigate(ScreenTypes.ARCHIVES_POST_WRITE);
  }, []);

  const renderItem = useCallback(({ item }) => <ArchiveItem item={item} />, []);

  if (isLoading || !postsData) {
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
      <CustomHeader title="Archives" />
      <FlatList data={postsData} renderItem={renderItem} keyExtractor={(item) => item.id} />
      <FloatingButton onPress={onFABPress} />
    </SafeAreaView>
  );
}

export default memo(ArchivesScreen, IsEqual);
