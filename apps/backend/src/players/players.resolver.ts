import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreatePlayerInput } from './dto/create-player.dto';
import { CreatePlayersInput } from './dto/create-players.dto';
import { GetPlayerDto } from './dto/get-player.dto';
import { GetPlayersInput } from './dto/get-players.dto';
import { ICreatePlayer, PlayersService } from './players.service';
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
    return this.playersService.create({ name: newPlayerData.name, playerId });
  }

  @Mutation(() => [Player])
  async createPlayers(
    @Args('newPlayersData', { type: () => CreatePlayersInput }) newPlayersData: CreatePlayersInput
  ): Promise<Player[]> {
    const playersWithPlayerId: ICreatePlayer[] = newPlayersData.names.map((name) => ({
      name,
      playerId: this.playersService.getPlayerIdFromName(name),
    }));
    const existingPlayersWithId = await this.playersService.findPlayers({
      searchField: 'playerId',
      searchValues: playersWithPlayerId.map((pl) => pl.playerId),
    });
    if (existingPlayersWithId?.length) {
      const duplicatePlayerIds = existingPlayersWithId.map((pl) => pl.playerId);
      throw new Error(
        `Unable to create players. The following player id(s) already exist: ${duplicatePlayerIds.join(
          ', '
        )}`
      );
    }
    return this.playersService.createPlayers(playersWithPlayerId);
  }
}
