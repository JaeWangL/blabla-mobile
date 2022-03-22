import { memo, useCallback, useEffect, useMemo } from 'react';
import IsEqual from 'react-fast-compare';
import { Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native-ui-lib';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FloatingButton from '@/components/floatingButton';
import { queryKeys } from '@/configs/api_keys';
import { HomeParamsList, PermissionedParamsList, ScreenTypes } from '@/configs/screen_types';
import { PostPreviewDTO } from '@/dtos/post_dtos';
import { getPostsByDistance } from '@/services/posts_service';
import { locationAtom } from '@/recoils/location_states';
import { customMapStyles } from './custom_map_styles';
import { styles } from './styles';

function getCurrentRegion(latitude: number, longitude: number) {
  return {
    latitude,
    longitude,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0222,
  };
}

type ScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<PermissionedParamsList, ScreenTypes.STACK_HOME>,
  StackNavigationProp<HomeParamsList>
>;

function HomeScreen(): JSX.Element {
  const navigation = useNavigation<ScreenNavigationProps>();
  const locations = useRecoilValue(locationAtom);
  const {
    isLoading,
    error,
    data: postsData,
    refetch,
  } = useQuery(queryKeys.postsByDistance, () => getPostsByDistance(locations.latitude, locations.longitude));

  useEffect(() => {
    refetch();
  }, [locations]);

  const curruentRegion = useMemo(
    () => getCurrentRegion(locations.latitude, locations.longitude),
    [locations.latitude, locations.longitude],
  );

  const getPostCoordinate = useCallback((latitude: number, longitude: number) => {
    return {
      latitude,
      longitude,
    };
  }, []);

  const onPostMarkerPress = useCallback((item: PostPreviewDTO): void => {
    navigation.navigate(ScreenTypes.SHARED_POST_DETAIL, {
      post: item,
    });
  }, []);

  const onFABPress = useCallback((): void => {
    navigation.navigate(ScreenTypes.SHARED_POST_WRITE);
  }, []);

  if (isLoading) {
    return <Text>Loading ...</Text>;
  }
  if (error) {
    return <Text>Error!!</Text>;
  }
  return (
    <View style={styles.wrapper}>
      <MapView
        style={styles.mapWrapper}
        provider="google"
        customMapStyle={customMapStyles}
        initialRegion={curruentRegion}
        showsUserLocation
        loadingEnabled
        minZoomLevel={12}
        scrollEnabled={false}
      >
        {postsData?.map((post) => (
          <Marker
            key={post.id}
            coordinate={getPostCoordinate(post.latitude, post.longitude)}
            title={post.title}
            onPress={() => onPostMarkerPress(post)}
          />
        ))}
      </MapView>
      <FloatingButton onPress={onFABPress} />
    </View>
  );
}

export default memo(HomeScreen, IsEqual);
