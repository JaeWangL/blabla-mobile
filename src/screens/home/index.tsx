import { memo, useCallback, useMemo } from 'react';
import IsEqual from 'react-fast-compare';
import { Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { queryKeys } from '@/configs/api_keys';
import { getPostsByDistance } from '@/services/posts_service';
import { locationAtom } from '@/recoils/location_states';
import { styles } from './styles';

function getCurrentCoordinate(latitude: number, longitude: number) {
  return {
    latitude,
    longitude,
  };
}

function getCurrentRegion(latitude: number, longitude: number) {
  return {
    latitude,
    longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
}

function HomeScreen(): JSX.Element {
  const locations = useRecoilValue(locationAtom);
  const {
    isLoading,
    error,
    data: postsData,
  } = useQuery(queryKeys.postsByDistance, () => getPostsByDistance(locations.latitude, locations.longitude));

  const curruentRegion = useMemo(
    () => getCurrentRegion(locations.latitude, locations.longitude),
    [locations.latitude, locations.longitude],
  );

  const currentCoordinate = useMemo(
    () => getCurrentCoordinate(locations.latitude, locations.longitude),
    [locations.latitude, locations.longitude],
  );

  const getPostCoordinate = useCallback((latitude: number, longitude: number) => {
    return {
      latitude,
      longitude,
    };
  }, []);

  if (isLoading) {
    return <Text>Loading ...</Text>;
  }
  if (error) {
    return <Text>Error!!</Text>;
  }
  return (
    <MapView style={styles.mapWrapper} region={curruentRegion}>
      <Marker coordinate={currentCoordinate} title="Me!" description="Me!" image={require('@assets/favicon.png')} />
      {postsData?.map((post) => (
        <Marker key={post.id} coordinate={getPostCoordinate(post.latitude, post.longitude)} title={post.title} />
      ))}
    </MapView>
  );
}

export default memo(HomeScreen, IsEqual);
