import axios from 'axios';
import { apiKeys } from '../configs/api_keys';
import { PostPreviewDTO } from '../dtos/post_dtos';

const postsInstance = axios.create({
  baseURL: apiKeys.postsDomain,
  timeout: 5000,
});

export const getPostsByDistance = async (
  currentLatitude: number,
  currentLongitude: number,
  distanceInKm = 1.0,
  pageSize = 10,
  pageIndex = 0,
): Promise<PostPreviewDTO[]> => {
  const res = await postsInstance.get<PostPreviewDTO[]>(
    `by/distance/latitude/${currentLatitude}/longitude/${currentLongitude}?distanceInKm=${distanceInKm}&pageSize=${pageSize}&pageIndex=${pageIndex}`,
  );
  return res.data;
};
