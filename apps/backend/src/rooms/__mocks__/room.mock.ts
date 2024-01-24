import { MOCK_USER_ID, MOCK_USER_ID_2 } from 'src/users/__mocks__/user.mock';

import { CreateRoomInput, Room } from '../schemas/room.schema';

export const MOCK_ID = 'mock_id';
export const MOCK_ROOM_NAME = 'mock room name';

export const MOCK_ROOM_INPUT: CreateRoomInput = {
  hostRef: MOCK_USER_ID,
  roomName: MOCK_ROOM_NAME,
};

export const MOCK_NEW_ROOM: Room = {
  _id: MOCK_ID,
  createdAt: undefined,
  updatedAt: undefined,
  roomName: MOCK_ROOM_NAME,
  hostRef: MOCK_USER_ID,
  connectedPlayerRefs: [],
  availableToJoin: true,
};

export const MOCK_CLOSED_ROOM: Room = {
  ...MOCK_NEW_ROOM,
  connectedPlayerRefs: [MOCK_USER_ID_2],
  availableToJoin: false,
};
