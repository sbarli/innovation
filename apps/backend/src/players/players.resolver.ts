import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreatePlayerDto } from './dto/create-player.dto';
import { GetPlayerDto } from './dto/get-player.dto';
import { PlayersService } from './players.service';
import { Player } from './schemas/player.schema';

@Resolver('players')
export class PlayersResolver {
  constructor(private readonly playersService: PlayersService) {}

  @Query(() => Player, { nullable: true })
  async getPlayer(
    @Args('getPlayerDto') getPlayerDto: GetPlayerDto
  ): Promise<Player | null | undefined> {
    switch (getPlayerDto.searchField) {
      case 'playerId':
        return this.playersService.findPlayerByPlayerId(getPlayerDto.searchValue);
      case 'ref':
        return this.playersService.findPlayerByRef(getPlayerDto.searchValue);
      default:
        throw new Error('playerId or ref required to find player');
    }
  }

  @Mutation(() => Player)
  async createPlayer(
    @Args('createPlayerDto', { type: () => CreatePlayerDto })
    createPlayerDto: CreatePlayerDto
  ): Promise<Player> {
    const existingPlayerWithId = await this.playersService.findPlayerByPlayerId(
      createPlayerDto.playerId
    );
    if (existingPlayerWithId) {
      throw new Error('Unable to create player with this playerId');
    }
    return this.playersService.create(createPlayerDto);
  }
}
