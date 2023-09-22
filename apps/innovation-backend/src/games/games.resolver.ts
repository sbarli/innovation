import { Game } from './schemas/game.schema';
import { GamesService } from './games.service';
import { UpdateGameDto } from './dto/update-game.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { validateGameUpdates } from './helpers/validate-game-updates';

@Resolver('games')
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

  @Query(() => Game, { nullable: true })
  async getGame(
    @Args('gameRef', { type: () => String }) gameRef: string,
  ): Promise<Game | null | undefined> {
    return this.gamesService.findGameByRef(gameRef);
  }

  @Mutation(() => Game)
  async createNewGame(
    @Args('createGameDto', { type: () => Game })
    createGameDto: Game,
  ): Promise<Game> {
    // TODO: validate no active game already exists for this set of players
    return await this.gamesService.create(createGameDto);
  }

  @Mutation(() => Game, { nullable: true })
  async updateGame(
    @Args('gameId', { type: () => String }) gameId: string,
    @Args('updates', { type: () => UpdateGameDto }) updates: UpdateGameDto,
  ): Promise<Game | null | undefined> {
    const { hasErrors, errors } = validateGameUpdates(updates);
    if (hasErrors) {
      throw new Error(`Unable to update game: ${errors.join(', ')}`);
    }
    return this.gamesService.updateGameByRef({
      ref: gameId,
      gameUpdates: updates,
    });
  }
}
