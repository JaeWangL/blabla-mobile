export enum ChatSocketDestination {
  // Send
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',
  SEND_MESSAGE = 'sendMessage',

  // Receive Notifications
  GET_PROFILE = 'getProfile',
  JOIN_NEW_MEMBER = 'joinedNewMember',
  LEAVED_EXISTING_MEMBER = 'leavedExistingMember',
  NEW_MESSAGE = 'newMessage',
}

export enum LocationSocketDestination {
  // Send
  UPDATE_LOCATION = '/app/location/update',

  // Receive Notifications
  CREATED_NEW_POST = '/user/queue/post/new',
}
