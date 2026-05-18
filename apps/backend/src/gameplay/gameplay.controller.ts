import { Controller, ForbiddenException, UseGuards } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@inno/api-contracts';
import { AuthUser, CurrentUser } from '../auth/decorators/current-user.decorator';
import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';
import { RoomsService } from '../rooms/rooms.service';
import { GamesService } from '../games/games.service';
import type { FullGameState } from '../games/games.service';
import { SocketGameService } from '../socket/services/socket-game.service';
import { SocketGateway } from '../socket/socket.gateway';
import { NewGameService } from './services/new-game.service';
import { PlayerActionsService } from './services/player-actions.service';

function serializeGameState(state: FullGameState, forPlayerId: string) {
  return {
    game: {
      id: state.game.id,
      roomId: state.game.roomId,
      stage: state.game.stage,
      currentPlayerId: state.game.currentPlayerId,
      currentActionNumber: state.game.currentActionNumber,
      winnerId: state.game.winnerId ?? null,
      deck: state.game.deck,
      ageAchievements: state.game.ageAchievements,
      createdAt: state.game.createdAt.toISOString(),
      updatedAt: state.game.updatedAt.toISOString(),
    },
    playerDetails: state.playerDetails.map((pd) => ({
      id: pd.id,
      gameId: pd.gameId,
      playerId: pd.playerId,
      board: pd.board,
      hand: pd.playerId === forPlayerId ? pd.hand : [],
      scorePile: pd.scorePile,
      ageAchievements: pd.ageAchievements,
      specialAchievements: pd.specialAchievements,
    })),
  };
}

@Controller()
@UseGuards(SupabaseAuthGuard)
export class GameplayController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly gamesService: GamesService,
    private readonly newGameService: NewGameService,
    private readonly playerActionsService: PlayerActionsService,
    private readonly socketGameService: SocketGameService,
    private readonly socketGateway: SocketGateway,
  ) {}

  @TsRestHandler(contract.gameplay.newGame)
  async newGame(@CurrentUser() user: AuthUser) {
    return tsRestHandler(contract.gameplay.newGame, async ({ params }) => {
      const room = await this.roomsService.findByIdOrThrow(params.roomId);
      if (room.hostId !== user.userId) {
        throw new ForbiddenException('Only the host can start the game');
      }
      if (room.members.length < 2) {
        throw new ForbiddenException('Need at least 2 players to start');
      }

      const playerIds = room.members.map((m) => m.id) as [string, string];
      const state = await this.newGameService.createGame(params.roomId, playerIds);

      const payloads = new Map(
        playerIds.map((pid) => [pid, { game: serializeGameState(state, pid).game, playerDetails: serializeGameState(state, pid).playerDetails }]),
      );
      this.socketGameService.broadcastGameStarted(this.socketGateway.server, params.roomId, payloads);

      return { status: 201 as const, body: serializeGameState(state, user.userId) };
    });
  }

  @TsRestHandler(contract.gameplay.getGame)
  async getGame(@CurrentUser() user: AuthUser) {
    return tsRestHandler(contract.gameplay.getGame, async ({ params }) => {
      const state = await this.gamesService.findById(params.gameId);
      if (!state) return { status: 404 as const, body: { message: 'Game not found' } };
      return { status: 200 as const, body: serializeGameState(state, user.userId) };
    });
  }

  @TsRestHandler(contract.gameplay.draw)
  async draw(@CurrentUser() user: AuthUser) {
    return tsRestHandler(contract.gameplay.draw, async ({ params }) => {
      const state = await this.playerActionsService.draw(params.gameId, user.userId);
      await this.broadcastUpdate(state, params.gameId);
      return { status: 200 as const, body: serializeGameState(state, user.userId) };
    });
  }

  @TsRestHandler(contract.gameplay.meld)
  async meld(@CurrentUser() user: AuthUser) {
    return tsRestHandler(contract.gameplay.meld, async ({ params, body }) => {
      const state = await this.playerActionsService.meld(params.gameId, user.userId, body.cardId);
      await this.broadcastUpdate(state, params.gameId);
      return { status: 200 as const, body: serializeGameState(state, user.userId) };
    });
  }

  @TsRestHandler(contract.gameplay.achieve)
  async achieve(@CurrentUser() user: AuthUser) {
    return tsRestHandler(contract.gameplay.achieve, async ({ params, body }) => {
      const state = await this.playerActionsService.achieve(params.gameId, user.userId, body.achievementAge);
      await this.broadcastUpdate(state, params.gameId);
      return { status: 200 as const, body: serializeGameState(state, user.userId) };
    });
  }

  private async broadcastUpdate(state: FullGameState, _gameId: string): Promise<void> {
    const room = await this.roomsService.findById(state.game.roomId);
    if (!room) return;

    const playerIds = state.playerDetails.map((pd) => pd.playerId);
    const payloads = new Map(
      playerIds.map((pid) => [pid, { game: serializeGameState(state, pid).game, playerDetails: serializeGameState(state, pid).playerDetails }]),
    );
    this.socketGameService.broadcastGameUpdated(this.socketGateway.server, state.game.roomId, payloads);
  }
}
