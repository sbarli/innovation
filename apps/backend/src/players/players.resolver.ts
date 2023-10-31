import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreatePlayerInput } from './dto/create-player.dto';
import { GetPlayerDto } from './dto/get-player.dto';
import { GetPlayersInput } from './dto/get-players.dto';
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

  @Query(() => [Player])
  async getPlayers(@Args('searchData') searchData: GetPlayersInput): Promise<Player[]> {
    switch (searchData.searchField) {
      case 'playerId':
      case 'ref':
        return this.playersService.findPlayers(searchData);
      default:
        throw new Error(
          'PlayersResolver -> Query -> getPlayers: searchField must be playerId or ref required to find player'
        );
    }
  }

  @Mutation(() => Player)
  async createPlayer(
    @Args('newPlayerData', { type: () => CreatePlayerInput }) newPlayerData: CreatePlayerInput
  ): Promise<Player> {
    const playerId = this.playersService.getPlayerIdFromName(newPlayerData.name);
    const existingPlayerWithId = await this.playersService.findPlayerByPlayerId(playerId);
    if (existingPlayerWithId) {
      throw new Error('Unable to create player with this playerId');
    }
    return this.playersService.create(newPlayerData.name, playerId);
  }
}
