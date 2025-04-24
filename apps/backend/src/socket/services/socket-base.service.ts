import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

import { UserWithoutPassword } from 'src/users/schemas/user.schema';

import { SocketRoomService } from './socket-room.service';
import { SocketUsersService } from './socket-users.service';

@Injectable()
export class SocketBaseService {
  private logger: Logger = new Logger('SocketBaseService');
  private readonly connectedClients: Map<string, Socket> = new Map();
  private readonly clientsToUsernameMap: Map<string, string> = new Map();

  constructor(
    private readonly socketRoomService: SocketRoomService,
    private readonly socketUsersService: SocketUsersService
  ) {}

  /**
   * @name handleConnection
   * @description handles storing connected clients and diconnect logic
   */
  handleConnection(socket: Socket, { socketServer }: { socketServer: Socket }): void {
    const socketId = socket.id;
    this.logger.log(`Client connected: ${socketId}`);
    this.connectedClients.set(socketId, socket);

    socket.on('disconnect', () => {
      this.logger.log(`Client disconnected: ${socketId}`);
      this.connectedClients.delete(socketId);
      const { data = { username: 'Unknown' } } = this.socketUsersService.getUsernameFromSocketId({
        socketId,
        setIfNotFound: false,
      });
      // this is a hack as we don't have user data in handleConnection
      // but closeRoom only looks for username which should have here
      const disconnectedUserForCloseRoom = {
        username: (data as { username: string }).username,
      } as UserWithoutPassword;
      // clear the socketId from the clientsToUsernameMap
      this.clientsToUsernameMap.delete(socketId);
      // close all rooms this socket was a member of
      socket.rooms.forEach((room) => {
        this.socketRoomService.handleCloseRoom(
          socket,
          { roomId: room, socketServer, user: disconnectedUserForCloseRoom },
          true
        );
      });
    });
  }
}
