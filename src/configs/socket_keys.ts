export enum ChatPubDestination {
  JOIN_ROOM = 'joinRoom',
  SEND_MESSAGE = 'sendMessage',
}

export enum ChatSubDestination {
  GET_PROFILE = 'getProfile',
  JOINED_NEW_MEMBER = 'joinedNewMember',
  LEAVED_EXISTING_MEMBER = 'leavedExistingMember',
  NEW_MESSAGE = 'newMessage',
}

export enum LocationSocketDestination {
  // Send
  UPDATE_LOCATION = '/app/location/update',

  // Receive Notifications
  CREATED_NEW_POST = '/user/queue/post/new',
}
