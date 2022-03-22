export interface JoinRoomRequest {
  roomId: string;

  /**
   *  1: Android
   *  2: iOS
   */
  deviceType: 1 | 2;
  deviceId: string;
}

export interface SendMessageRequest {
  roomId: string;
  nickName: string;
  message: string;
}

export interface SentMessage {
  nickName: string;
  message: string;
  createdAt: Date;
}

export interface JoinedNewMember {
  nickName: string;
  joinedAt: Date;
}

export interface LeavedExistingMember {
  nickName: string;
  leavedAt: Date;
}
