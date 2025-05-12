import { Injectable, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import {
  Age,
  SocketEvent,
  SocketEventError,
  SocketEventErrorCode,
  SocketEventResponse,
} from '@inno/constants';
import { getCatchErrorMessage } from '@inno/utils';

import { GamesService } from 'src/games/games.service';

import { ISocketServiceMethodParamsWithRoomId } from '../socket.types';

export interface IParamsWithGameId extends ISocketServiceMethodParamsWithRoomId {
  gameId: string;
}

export interface IHandlePlayerMeldedCardParams extends ISocketServiceMethodParamsWithRoomId {
  cardName: string;
}

export interface IHandlePlayerDrewCardParams extends ISocketServiceMethodParamsWithRoomId {
  cardAge: Age;
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

  /**
   * @name handleStarterCardMelded
   * @description handles emitting event to room notifying a player has melded their starter card
   */
  async handleStarterCardMelded(
    socket: Socket,
    { roomId, user }: ISocketServiceMethodParamsWithRoomId
  ) {
    try {
      if (!socket.rooms.has(roomId)) {
        this.logger.error(
          `${user._id} could not notify starter card meld: User is not member of room ${roomId}`
        );
        const errorData = new SocketEventError(
          SocketEventErrorCode.INVALID,
          'User cannot emit events to room they are not a member of',
          {
            roomId,
            userId: user._id,
          }
        );
        return new SocketEventResponse({
          success: false,
          error: errorData,
        });
      }

      socket.to(roomId).emit(SocketEvent.ROOM_STARTER_CARD_MELDED, {
        meldedBy: {
          userId: user._id,
          username: user.username,
        },
      });
      return new SocketEventResponse({ success: true });
    } catch (error) {
      const errorMessage = getCatchErrorMessage(
        error,
        `Could not handle starter card meld: Unknown reason`
      );
      this.logger.error(errorMessage);
      // TODO: handle error properly
      // const errorData = new SocketEventError(SocketEventErrorCode.UNKNOWN, errorMessage);
      // socket.emit(SocketEvent.START_GAME_ERROR, {
      //   error: errorData,
      // });
      throw new WsException(errorMessage);
    }
  }

  /**
   * @name handlePlayerMeldedCard
   * @description handles emitting event to room notifying a player has melded a card
   */
  async handlePlayerMeldedCard(
    socket: Socket,
    { cardName, roomId, user }: IHandlePlayerMeldedCardParams
  ) {
    try {
      if (!socket.rooms.has(roomId)) {
        this.logger.error(
          `${user._id} could not notify card meld: User is not member of room ${roomId}`
        );
        const errorData = new SocketEventError(
          SocketEventErrorCode.INVALID,
          'User cannot emit events to room they are not a member of',
          {
            roomId,
            userId: user._id,
          }
        );
        return new SocketEventResponse({
          success: false,
          error: errorData,
        });
      }

      socket.to(roomId).emit(SocketEvent.ROOM_CARD_MELDED, {
        cardName,
        meldedBy: {
          userId: user._id,
          username: user.username,
        },
      });
      return new SocketEventResponse({ success: true });
    } catch (error) {
      const errorMessage = getCatchErrorMessage(
        error,
        `Could not handle starter card meld: Unknown reason`
      );
      this.logger.error(errorMessage);
      // TODO: handle error properly
      // const errorData = new SocketEventError(SocketEventErrorCode.UNKNOWN, errorMessage);
      // socket.emit(SocketEvent.START_GAME_ERROR, {
      //   error: errorData,
      // });
      throw new WsException(errorMessage);
    }
  }

  /**
   * @name handlePlayerDrewCard
   * @description handles emitting event to room notifying a player has drawn a card
   */
  async handlePlayerDrewCard(
    socket: Socket,
    { cardAge, roomId, user }: IHandlePlayerDrewCardParams
  ) {
    try {
      if (!socket.rooms.has(roomId)) {
        this.logger.error(
          `${user._id} could not notify card drawn: User is not member of room ${roomId}`
        );
        const errorData = new SocketEventError(
          SocketEventErrorCode.INVALID,
          'User cannot emit events to room they are not a member of',
          {
            roomId,
            userId: user._id,
          }
        );
        return new SocketEventResponse({
          success: false,
          error: errorData,
        });
      }

      socket.to(roomId).emit(SocketEvent.ROOM_CARD_DRAWN, {
        cardAge,
        drawnBy: {
          userId: user._id,
          username: user.username,
        },
      });
      return new SocketEventResponse({ success: true });
    } catch (error) {
      const errorMessage = getCatchErrorMessage(
        error,
        `Could not handle starter card drawn: Unknown reason`
      );
      this.logger.error(errorMessage);
      // TODO: handle error properly
      // const errorData = new SocketEventError(SocketEventErrorCode.UNKNOWN, errorMessage);
      // socket.emit(SocketEvent.START_GAME_ERROR, {
      //   error: errorData,
      // });
      throw new WsException(errorMessage);
    }
  }
}
