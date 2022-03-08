import axios from 'axios';
import { apiKeys } from '../configs/api_keys';
import { CreatePostRequest, PostCreatedDTO, PostDetailDTO, PostPreviewDTO } from '../dtos/post_dtos';

const postsInstance = axios.create({
  baseURL: apiKeys.postsDomain,
  timeout: 5000,
});

export const createPost = async (data: CreatePostRequest): Promise<PostCreatedDTO> => {
  const res = await postsInstance.post<PostCreatedDTO>('', data);
  return res.data;
};

export const getPostById = async (id: string): Promise<PostDetailDTO> => {
  const res = await postsInstance.get<PostDetailDTO>(`id/${id}`);
  return res.data;
};

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
