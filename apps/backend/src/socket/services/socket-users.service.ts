import { Injectable } from '@nestjs/common';

@Injectable()
export class SocketUsersService {
  private readonly userToSocket = new Map<string, string>();
  private readonly socketToUser = new Map<string, string>();

  mapUserToSocket(userId: string, socketId: string): void {
    const existingSocket = this.userToSocket.get(userId);
    if (existingSocket) this.socketToUser.delete(existingSocket);
    this.userToSocket.set(userId, socketId);
    this.socketToUser.set(socketId, userId);
  }

  getSocketIdForUser(userId: string): string | undefined {
    return this.userToSocket.get(userId);
  }

  getUserIdForSocket(socketId: string): string | undefined {
    return this.socketToUser.get(socketId);
  }

  removeSocket(socketId: string): void {
    const userId = this.socketToUser.get(socketId);
    if (userId) this.userToSocket.delete(userId);
    this.socketToUser.delete(socketId);
  }
}
