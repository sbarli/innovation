import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtGqlAuthGuard } from 'src/auth/guards/jwt-gql-auth.guard';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';

import { getCatchErrorMessage } from '@inno/utils';

import { RoomsService } from './rooms.service';
import { CreateRoomInput, NullishRoom, Room } from './schemas/room.schema';

@Resolver('rooms')
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Query(() => Room, { nullable: true })
  @UseGuards(JwtGqlAuthGuard)
  async getRoom(@Args('roomRef', { type: () => String }) roomRef: string): Promise<NullishRoom> {
    try {
      return this.roomsService.findRoomByRef(roomRef);
    } catch (error) {
      throw new HttpException(
        getCatchErrorMessage(error, `GetRoom Query -> Could not find room with id ${roomRef}`),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Query(() => [Room], { nullable: true })
  @UseGuards(JwtGqlAuthGuard)
  async getRoomsForPlayer(
    @CurrentUser() user: UserWithoutPassword
    // @Args('playerRef', { type: () => String }) playerRef: string
  ): Promise<Room[]> {
    try {
      return this.roomsService.findRoomsByPlayerRef(user._id);
    } catch (error) {
      throw new HttpException(
        getCatchErrorMessage(
          error,
          `getRoomsForPlayer Query -> Could not find rooms for player with id ${user._id}`
        ),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Mutation(() => Room)
  @UseGuards(JwtGqlAuthGuard)
  async createRoom(
    @CurrentUser() user: UserWithoutPassword,
    @Args('newRoomData', { type: () => CreateRoomInput }) newRoomData: CreateRoomInput
  ): Promise<Room> {
    return await this.roomsService.createRoom({
      newRoomData,
      user,
    });
  }
}
