export enum SocketEventErrorCode {
  DUPE = 50,
  NOT_FOUND = 75,
  UNKNOWN = 100,
}

export class SocketEventError {
  constructor(
    public errorCode: SocketEventErrorCode,
    public message: string,
    public data?: unknown
  ) {}
}

export enum SocketEvent {
  // server-emitted events
  CREATE_ROOM_ERROR = 'createRoomError',
  CREATE_ROOM_SUCCESS = 'createRoomSuccess',
  JOIN_ROOM_ERROR = 'joinRoomError',
  JOIN_ROOM_SUCCESS = 'joinRoomSuccess',
  LEAVE_ROOM_SUCCESS = 'leaveRoomSuccess',
  LEAVE_ROOM_ERROR = 'leaveRoomError',

  // client-Emitted Events
  CREATE_ROOM = 'createRoom',
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',

  // event emitted to rooms
  HOST_LEFT_ROOM_NEW_HOST_ASSIGNED = 'hostLeftRoomNewHostAssigned',
  USER_JOINED_ROOM = 'userJoinedRoom',
  USER_LEFT_ROOM = 'userLeftRoom',
}
