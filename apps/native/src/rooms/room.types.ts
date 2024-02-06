export interface IPlayersInRoom {
  roomId: string;
  playersInRoom: number;
}

export type CreateRoomFormData = {
  roomName: string;
};

export type JoinRoomFormData = {
  roomId: string;
};
