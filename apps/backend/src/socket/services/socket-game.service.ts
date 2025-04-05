import { Injectable, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { PlayerActionsService } from 'src/gameplay/services/player-actions.service';
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

export interface IHandleMeldCardFromHandParams extends IParamsWithGameId {
  cardId: string;
}

@Injectable()
export class SocketGameService {
  private logger: Logger = new Logger('SocketGameService');

  constructor(
    private readonly gamesService: GamesService,
    private readonly playerActionsService: PlayerActionsService
  ) {}

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

      socket.to(roomId).emit(SocketEvent.GAME_UPDATED, {
        userId: user._id,
        username: user.username,
      });
      return new SocketEventResponse({ success: true });
    } catch (error) {
      const errorMessage = getCatchErrorMessage(
        error,
        `Could not handle starter card meld: Unknown reason`
      );
      this.logger.error(errorMessage);
      // const errorData = new SocketEventError(SocketEventErrorCode.UNKNOWN, errorMessage);
      // socket.emit(SocketEvent.START_GAME_ERROR, {
      //   error: errorData,
      // });
      throw new WsException(errorMessage);
    }
  }

  /**
   * @name handleMeldCardFromHand
   * @description handles melding a card from the player's hand and emitting the updated game state to the room
   */
  async handleMeldCardFromHand(
    socket: Socket,
    { cardId, gameId, roomId, user }: IHandleMeldCardFromHandParams
  ) {
    try {
      console.log('playerActionsService', !!this.playerActionsService);
      // const meldSuccess = await this.playerActionsService.meldCardFromHand();
      // if (!meldSuccess) {
      //   this.logger.error(`${user._id} could not meld card ${cardId}`);
      //   const errorData = new SocketEventError(SocketEventErrorCode.INVALID, 'Meld card failed', {
      //     gameId,
      //     roomId,
      //     userId: user._id,
      //     cardId,
      //   });
      //   return new SocketEventResponse({
      //     success: false,
      //     error: errorData,
      //   });
      // }
      if (!socket.rooms.has(roomId)) {
        this.logger.error(`${user._id} could not meld card ${cardId}: User is not member of room`);
        const errorData = new SocketEventError(
          SocketEventErrorCode.INVALID,
          'User cannot meld card for room they are not a member of',
          {
            gameId,
            roomId,
            userId: user._id,
            cardId,
          }
        );
        return new SocketEventResponse({
          success: false,
          error: errorData,
        });
      }

      socket.to(roomId).emit(SocketEvent.CARD_MELDED, {
        cardId,
        gameId,
        userId: user._id,
        username: user.username,
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
