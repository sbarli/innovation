import { Injectable, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { GamesService } from 'src/games/games.service';

import {
  SocketEvent,
  SocketEventError,
  SocketEventErrorCode,
  SocketEventResponse,
} from '@inno/constants';
import { getCatchErrorMessage } from '@inno/utils';

import { ISocketServiceMethodParamsWithRoomId } from '../socket.types';

export interface IParamsWithGameId extends ISocketServiceMethodParamsWithRoomId {
  gameId: string;
}

@Injectable()
export class SocketGameService {
  private logger: Logger = new Logger('SocketGameService');

  constructor(private readonly gamesService: GamesService) {}

  /**
   * @name handleStartGame
   * @description handles notifying all room clients that a game has started
   */
  async handleStartGame(socket: Socket, { gameId, roomId, user }: IParamsWithGameId) {
    try {
      const game = await this.gamesService.findGameById(gameId);
      if (!game) {
        this.logger.error(`${user._id} could not start game ${gameId}: Game not found`);
        const errorData = new SocketEventError(SocketEventErrorCode.NOT_FOUND, 'Game not found', {
          gameId,
          roomId,
        });
        return new SocketEventResponse({
          success: false,
          error: errorData,
        });
      }
      if (!socket.rooms.has(roomId)) {
        this.logger.error(`${user._id} could not start game ${gameId}: User is not member of room`);
        const errorData = new SocketEventError(
          SocketEventErrorCode.INVALID,
          'User cannot start game for room they are not a member of',
          {
            gameId,
            roomId,
          }
        );
        return new SocketEventResponse({
          success: false,
          error: errorData,
        });
      }

      socket.to(roomId).emit(SocketEvent.GAME_STARTED, {
        username: user.username,
        gameId,
      });
      return new SocketEventResponse({ success: true });
    } catch (error) {
      const errorMessage =
        getCatchErrorMessage(error) ?? `${user._id} could not start game ${gameId}: Unknown reason`;
      this.logger.error(errorMessage);
      const errorData = new SocketEventError(SocketEventErrorCode.UNKNOWN, errorMessage);
      socket.emit(SocketEvent.START_GAME_ERROR, {
        error: errorData,
      });
      throw new WsException(errorMessage);
    }
  }
}
