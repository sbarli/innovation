import { Socket } from 'socket.io';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';

export interface IBaseSocketServiceParams {
  user: UserWithoutPassword;
  socketServer: Socket;
}

export interface ISocketServiceMethodParamsWithRoomId extends IBaseSocketServiceParams {
  roomId: string;
}
