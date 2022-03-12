export interface CreatePostRequest {
  deviceType: 1 | 2;
  deviceId: string;
  latitude: number;
  longitude: number;
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  detailAddress?: string;
  zipCode?: string;
  title: string;
  contents: string;
  thumbnailUrl?: string;
  originalFileName?: string;
}

export interface PostCreatedDTO {
  id: string;
  deviceType: 1 | 2;
  deviceId: string;
}

export interface PostDetailDTO {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  contents: string;
  thumbnailUrl?: string;
  joinedUsers: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostPreviewDTO {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  contentsSnippet: string;
  thumbnailUrl?: string;
  distanceM: number;
  joinedUsers: number;
  createdAt: Date;
  updatedAt: Date;
}
