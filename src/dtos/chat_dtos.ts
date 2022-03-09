export interface JoinRoomRequest {
  roomId: string;

  /**
   *  1: Android
   *  2: iOS
   */
  deviceType: 1 | 2;
  deviceId: string;
}

export interface LeaveRoomRequest {
  roomId: string;

  /**
   *  1: Android
   *  2: iOS
   */
  deviceType: 1 | 2;
  deviceId: string;
  nickName: string;
}

export interface SendMessageRequest {
  roomId: string;
  nickName: string;
  message: string;
}

export interface SentMessage {
  nickName: string;
  message: string;
}
