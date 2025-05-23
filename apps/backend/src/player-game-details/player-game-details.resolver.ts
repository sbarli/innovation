import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

import { UpdatePlayerGameDetailsInput } from './dto/update-player-game-details.dto';
import { PlayerGameDetailsService } from './player-game-details.service';
import {
  CreatePlayerGameDetailsInput,
  PlayerGameDetails,
} from './schemas/player-game-details.schema';

@Resolver(() => PlayerGameDetails)
export class PlayerGameDetailsResolver {
  constructor(
    private usersService: UsersService,
    private readonly playerGameDetailsService: PlayerGameDetailsService
  ) {}

  @Query(() => PlayerGameDetails, { nullable: true })
  async getPlayerGameDetails(
    @Args('gameRef', { type: () => ID }) gameRef: string,
    @Args('playerRef', { type: () => ID }) playerRef: string
  ): Promise<PlayerGameDetails | null | undefined> {
    return this.playerGameDetailsService.findDetailsByGameAndPlayer({
      gameRef,
      playerRef,
    });
  }

  @Query(() => PlayerGameDetails, { nullable: true })
  async getPlayerGameDetailsWithUser(
    @Args('gameRef', { type: () => ID }) gameRef: string,
    @Args('playerRef', { type: () => ID }) playerRef: string
  ): Promise<PlayerGameDetails | null | undefined> {
    return this.playerGameDetailsService.findDetailsByGameAndPlayer({
      gameRef,
      playerRef,
    });
  }

  @Query(() => [PlayerGameDetails])
  async getDetailsByGame(
    @Args('gameRef', { type: () => ID }) gameRef: string
  ): Promise<PlayerGameDetails[]> {
    return this.playerGameDetailsService.findDetailsByGame({
      gameRef,
    });
  }

  @Query(() => PlayerGameDetails, { nullable: true })
  async getPlayerGameDetailsById(@Args('id', { type: () => ID }) id: string) {
    return this.playerGameDetailsService.findById(id);
  }

  @Mutation(() => PlayerGameDetails)
  async createPlayerGameDetails(
    @Args('createData', { type: () => CreatePlayerGameDetailsInput })
    createData: CreatePlayerGameDetailsInput
  ) {
    const existingPlayerGameDetails =
      await this.playerGameDetailsService.findDetailsByGameAndPlayer({
        gameRef: createData.gameRef,
        playerRef: createData.playerRef,
      });
    if (existingPlayerGameDetails) {
      throw new Error('This player already has game details. Did you mean to update?');
    }
    return this.playerGameDetailsService.create(createData);
  }

  @Mutation(() => PlayerGameDetails, { nullable: true })
  async updatePlayerGameDetails(
    @Args('id', { type: () => ID }) id: string,
    @Args('updates', { type: () => UpdatePlayerGameDetailsInput })
    updates: UpdatePlayerGameDetailsInput
  ) {
    // TODO: validate updates
    return this.playerGameDetailsService.updateById({
      id,
      updates,
    });
  }

  @ResolveField('username', () => User)
  async username(@Parent() playerGameDetails: PlayerGameDetails) {
    const { playerRef } = playerGameDetails;
    return this.usersService.getUsernameByRef(playerRef);
  }
}
