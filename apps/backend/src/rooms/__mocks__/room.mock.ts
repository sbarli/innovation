import { MOCK_USER_ID, MOCK_USER_ID_2 } from 'src/users/__mocks__/user.mock';

import { CreateRoomInput } from '../dto/create-room.dto';
import { Room } from '../schemas/room.schema';

export const MOCK_ROOM_ID = 'mock_id';
export const MOCK_ROOM_NAME = 'mock room name';

export const MOCK_ROOM_INPUT: CreateRoomInput = {
  roomName: MOCK_ROOM_NAME,
};

export const MOCK_NEW_ROOM: Room = {
  _id: MOCK_ROOM_ID,
  createdAt: undefined,
  updatedAt: undefined,
  name: MOCK_ROOM_NAME,
  hostRef: MOCK_USER_ID,
  playerRefs: [],
  availableToJoin: true,
};

export const MOCK_CLOSED_ROOM: Room = {
  ...MOCK_NEW_ROOM,
  playerRefs: [MOCK_USER_ID_2],
  availableToJoin: false,
};
