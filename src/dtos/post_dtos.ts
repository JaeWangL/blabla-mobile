export interface CreatePostRequest {
  eviceType: 1 | 2;
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

export interface PostPreviewDTO {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  contentsSnippet: string;
  thumbnailUrl?: string;
}
