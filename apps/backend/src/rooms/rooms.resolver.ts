import { ForbiddenException, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUserFromGqlCtx } from 'src/auth/decorators/current-user.decorator';
import { JwtGqlAuthGuard } from 'src/auth/guards/jwt-gql-auth.guard';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';

import { getCatchErrorMessage } from '@inno/utils';

import { CloseRoomResponse } from './dto/close-room.reponse.dto';
import { CreateRoomInput } from './dto/create-room.dto';
import { UpdateRoomAvailabilityInput } from './dto/update-room-availability.dto';
import { RoomsService } from './rooms.service';
import { NullishRoom, Room } from './schemas/room.schema';

@Resolver('rooms')
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Query(() => Room, { nullable: true })
  @UseGuards(JwtGqlAuthGuard)
  async getRoom(@Args('roomId', { type: () => String }) roomId: string): Promise<NullishRoom> {
    try {
      return this.roomsService.findRoomByRef(roomId);
    } catch (error) {
      throw new HttpException(
        getCatchErrorMessage(error, `GetRoom Query -> Could not find room with id ${roomId}`),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Query(() => [Room], { nullable: true })
  @UseGuards(JwtGqlAuthGuard)
  async getRoomsForPlayer(
    @CurrentUserFromGqlCtx() user: UserWithoutPassword
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
    @CurrentUserFromGqlCtx() user: UserWithoutPassword,
    @Args('newRoomData', { type: () => CreateRoomInput }) newRoomData: CreateRoomInput
  ): Promise<Room> {
    return await this.roomsService.createRoom({
      roomName: newRoomData.roomName,
      user,
    });
  }

  @Mutation(() => Room, { nullable: true })
  @UseGuards(JwtGqlAuthGuard)
  async addPlayerToRoom(
    @CurrentUserFromGqlCtx() user: UserWithoutPassword,
    @Args('roomId', { type: () => String }) roomId: string
  ): Promise<NullishRoom> {
    return await this.roomsService.addPlayerToRoom({
      roomId,
      playerRef: user._id,
    });
  }

  @Mutation(() => Room, { nullable: true })
  @UseGuards(JwtGqlAuthGuard)
  async updateRoomAvailability(
    @CurrentUserFromGqlCtx() user: UserWithoutPassword,
    @Args('data', { type: () => UpdateRoomAvailabilityInput }) data: UpdateRoomAvailabilityInput
  ): Promise<NullishRoom> {
    try {
      const allowedToUpdate = await this.roomsService.validateUserIsRoomHost(data.roomId, user._id);
      if (!allowedToUpdate) {
        throw new ForbiddenException();
      }
      return this.roomsService.updateRoomAvailability(data);
    } catch (error) {
      throw new HttpException(
        getCatchErrorMessage(
          error,
          `updateRoomAvailability Mutation -> Could not update availabilty for room ${data.roomId}`
        ),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Mutation(() => CloseRoomResponse)
  @UseGuards(JwtGqlAuthGuard)
  async closeRoom(
    @CurrentUserFromGqlCtx() user: UserWithoutPassword,
    @Args('roomId', { type: () => String }) roomId: string
  ): Promise<CloseRoomResponse> {
    try {
      await this.roomsService.closeRoom({
        roomId,
        playerRef: user._id,
      });
      return { success: true };
    } catch (_e) {
      return { success: false };
    }
  }
}
