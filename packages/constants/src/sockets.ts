export enum SocketEventErrorCode {
  DUPE = 50,
  UNKNOWN = 100,
}

export type SocketEventError = {
  errorCode: SocketEventErrorCode;
  message: string;
};

export enum SocketEvent {
  // server-emitted events
  ALREADY_IN_ROOM = 'alreadyInRoom',
  CREATE_ROOM_ERROR = 'createRoomError',
  CREATE_ROOM_SUCCESS = 'createRoomSuccess',
  LEFT_ROOM = 'leftRoom',
  ROOM_JOINED = 'roomJoined',

  // client-Emitted Events
  CREATE_ROOM = 'createRoom',
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',

  // event emitted to rooms
  HOST_LEFT_ROOM_NEW_HOST_ASSIGNED = 'hostLeftRoomNewHostAssigned',
  USER_JOINED_ROOM = 'userJoinedRoom',
  USER_LEFT_ROOM = 'userLeftRoom',
}
