import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';

import { SocketEventError, SocketEventErrorCode, SocketEventResponse } from '@inno/constants';

@Injectable()
export class SocketUsersService {
  private logger: Logger = new Logger('SocketUsersService');
  private readonly clientsToUsernameMap: Map<string, string> = new Map();

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {}

  /**
   * @name handleSocketToUserMap
   * @description handles storing a map of connected clients to specific usernames
   */
  handleSocketToUserMap(socket: Socket, { user }: { user: UserWithoutPassword }): void {
    const socketId = socket.id;
    this.logger.log(`Mapping socket ${socketId} to username ${user.username}`);
    this.clientsToUsernameMap.set(socketId, user.username);
  }

  /**
   * @name getUsernameFromSocketId
   * @description attempts to pull a username based on socket id
   *  if {setIfNotFound} is TRUE => attempts to set the value based on passed in user data
   */
  getUsernameFromSocketId({
    setIfNotFound = true,
    socketId,
    user,
  }: {
    setIfNotFound: boolean;
    socketId: string;
    user?: UserWithoutPassword;
  }) {
    const socketUsername = this.clientsToUsernameMap.get(socketId);
    if (socketUsername) {
      return new SocketEventResponse({
        success: true,
        data: { username: socketUsername },
      });
    }
    if (!setIfNotFound || !user?.username) {
      const errorData = new SocketEventError(
        SocketEventErrorCode.NOT_FOUND,
        'Could not find username for socket',
        { socketId: socketId }
      );
      return new SocketEventResponse({
        success: false,
        error: errorData,
      });
    }
    this.clientsToUsernameMap.set(socketId, user?.username);
    return new SocketEventResponse({
      success: true,
      data: { username: user.username },
    });
  }

  /**
   * @name getManyUsernamesFromSocketIds
   * @description attempts to pull a set of usernames based on socket ids
   */
  getManyUsernamesFromSocketIds(ids: string[], fallback: string = 'Unknown') {
    return ids.map((id) => this.clientsToUsernameMap.get(id) ?? fallback);
  }

  /**
   * @name removeSocketFromUsernameMap
   * @description removes socketId key from clientsToUsernameMap, if exists
   */
  removeSocketFromUsernameMap(socketId: string) {
    this.clientsToUsernameMap.delete(socketId);
  }
}
