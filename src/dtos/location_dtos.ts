export interface UpdateLocationRequest {
  deviceType: 1 | 2;
  deviceId: string;
  latitude: number;
  longitude: number;
}

export interface NewPostCreatedMessage {
  title: string;
}
