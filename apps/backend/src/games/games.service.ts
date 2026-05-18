import { Injectable, NotFoundException } from '@nestjs/common';
import * as schema from '@inno/db-schema';
import type { TypedGame, TypedPlayerGameDetails, User } from '@inno/db-schema';
import { eq } from 'drizzle-orm';
import { DbService } from '../db/db.service';

export interface FullGameState {
  game: TypedGame;
  playerDetails: (TypedPlayerGameDetails & { player: Pick<User, 'id' | 'username'> })[];
}

@Injectable()
export class GamesService {
  constructor(private readonly dbService: DbService) {}

  async findById(gameId: string): Promise<FullGameState | null> {
    return this.dbService.withInnoRole(async (tx) => {
      const [game] = await tx
        .select()
        .from(schema.games)
        .where(eq(schema.games.id, gameId))
        .limit(1);

      if (!game) return null;

      const details = await tx
        .select({
          pgd: schema.playerGameDetails,
          user: { id: schema.users.id, username: schema.users.username },
        })
        .from(schema.playerGameDetails)
        .innerJoin(schema.users, eq(schema.playerGameDetails.playerId, schema.users.id))
        .where(eq(schema.playerGameDetails.gameId, gameId));

      return {
        game: game as unknown as TypedGame,
        playerDetails: details.map(({ pgd, user }) => ({
          ...(pgd as unknown as TypedPlayerGameDetails),
          player: user,
        })),
      };
    });
  }

  async findByIdOrThrow(gameId: string): Promise<FullGameState> {
    const state = await this.findById(gameId);
    if (!state) throw new NotFoundException(`Game ${gameId} not found`);
    return state;
  }

  async findByRoomId(roomId: string): Promise<FullGameState | null> {
    return this.dbService.withInnoRole(async (tx) => {
      const [game] = await tx
        .select()
        .from(schema.games)
        .where(eq(schema.games.roomId, roomId))
        .limit(1);

      if (!game) return null;
      return this.findById(game.id);
    });
  }
}
