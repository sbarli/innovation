export enum SocketEventErrorCode {
  DUPE = 5050,
  INVALID = 5035,
  NOT_FOUND = 5040,
  UNKNOWN = 5000,
}

export class SocketEventError {
  errorCode: SocketEventErrorCode;
  message: string;
  data?: unknown | undefined;

  constructor(errorCode: SocketEventErrorCode, message: string, data?: unknown | undefined) {
    this.errorCode = errorCode;
    this.message = message;
    this.data = data;
  }
}

export class SocketEventResponse {
  success: boolean;
  data?: unknown;
  error?: SocketEventError;

  constructor(responseData: { success: boolean; data?: unknown; error?: SocketEventError }) {
    this.success = responseData.success;
    this.data = responseData.data;
    this.error = responseData.error;
  }
}

export enum SocketEvent {
  CLOSE_ROOM_ERROR = 'closeRoomError',
  JOIN_ROOM_ERROR = 'joinRoomError',
  START_GAME_ERROR = 'startGameError',
  CLOSE_ROOM = 'closeRoom',
  GET_ROOM_METADATA = 'getRoomMetadata',
  JOIN_ROOM = 'joinRoom',
  MAP_USER_TO_SOCKET = 'mapUserToSocket',
  PLAYER_DREW_CARD = 'playerDrewCard',
  PLAYER_MELDED_CARD = 'playerMeldedCard',
  START_GAME = 'startGame',
  STARTER_CARD_MELDED = 'starterCardMelded',
  CLOSE_ROOM_IN_PROGRESS = 'closeRoomInProgress',
  CLOSE_ROOM_SUCCESS = 'closeRoomSuccess',
  GAME_STARTED = 'gameStarted',
  GAME_UPDATED = 'gameUpdated',
  ROOM_CARD_DRAWN = 'roomCardDrawn',
  ROOM_CARD_MELDED = 'roomCardMelded',
  ROOM_STARTER_CARD_MELDED = 'roomStarterCardMelded',
  USER_JOINED_ROOM = 'userJoinedRoom',
  USER_LEFT_ROOM = 'userLeftRoom',
}
