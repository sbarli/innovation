import { HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { getCatchErrorMessage } from '@inno/utils';

import { UpdateGameInput } from './dto/update-game.dto';
import { GamesService } from './games.service';
import { validateGameUpdates } from './helpers/validate-game-updates';
import { CreateGameInput, Game } from './schemas/game.schema';

@Resolver('games')
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

  @Query(() => Game, { nullable: true })
  async getGame(
    @Args('gameId', { type: () => String }) gameId: string
  ): Promise<Game | null | undefined> {
    try {
      return this.gamesService.findGameById(gameId);
    } catch (error) {
      throw new HttpException(
        getCatchErrorMessage(error, `GetGame Query -> Could not find game with id ${gameId}`),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Mutation(() => Game)
  async createNewGame(
    @Args('newGameData', { type: () => CreateGameInput }) newGameData: CreateGameInput
  ): Promise<Game> {
    // TODO: validate no active game already exists for this set of players
    return await this.gamesService.create(newGameData);
  }

  @Mutation(() => Game, { nullable: true })
  async updateGame(
    @Args('id', { type: () => String }) id: string,
    @Args('updates', { type: () => UpdateGameInput }) updates: UpdateGameInput
  ): Promise<Game | null | undefined> {
    const { hasErrors, errors } = validateGameUpdates(updates);
    if (hasErrors) {
      throw new Error(`Unable to update game: ${errors.join(', ')}`);
    }
    return this.gamesService.updateGameByRef({
      ref: id,
      gameUpdates: updates,
    });
  }
}
