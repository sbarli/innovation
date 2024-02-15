export interface IRoomMetadata {
  gameId?: string | null;
  playersInRoom: string[];
  roomId: string;
}

export const MAX_USERS_PER_ROOM = 2;
