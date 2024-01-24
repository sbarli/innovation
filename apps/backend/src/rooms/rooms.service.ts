import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

import { getCatchErrorMessage } from '@inno/utils';

import { PlayerRoomType } from './rooms.types';
import { CreateRoomInput, NullishRoom, Room, RoomDocument } from './schemas/room.schema';

export interface ICreateRoomProps {
  newRoomData: CreateRoomInput;
  user: UserWithoutPassword;
}

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    private usersService: UsersService
  ) {}

  async findRoomByRef(ref: string): Promise<NullishRoom> {
    try {
      return this.roomModel.findById(ref);
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error, 'RoomsService.findRoomByRef -> Error finding room')
      );
    }
  }

  async findRoomsByPlayerRef(
    playerRef: string,
    roomType: PlayerRoomType = 'both'
  ): Promise<Room[]> {
    try {
      const rooms = await this.roomModel.find({
        $or: [
          {
            hostRef: playerRef,
          },
          {
            connectedPlayerRefs: {
              $in: [playerRef],
            },
          },
        ],
      });
      // if we have no rooms or just want all rooms the player is in
      if (!rooms.length || roomType === 'both') {
        return rooms;
      }
      // if we specifically want rooms where the player is the host
      if (roomType === 'host') {
        return rooms.filter((room) => room.hostRef === playerRef);
      }
      // fallback: just rooms where player is participant, not host
      return rooms.filter((room) => room.hostRef !== playerRef);
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error, 'RoomsService.findRoomsByPlayerRef -> Error finding rooms')
      );
    }
  }

  async createRoom({ newRoomData, user }: ICreateRoomProps): Promise<Room> {
    try {
      const createdRoom = new this.roomModel({
        ...newRoomData,
        hostRef: user._id,
        connectedPlayerRefs: [],
        availableToJoin: true,
      });
      return createdRoom.save();
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error, 'RoomsService.createRopm -> Error creating room')
      );
    }
  }

  async addPlayerToRoom(roomRef: string, playerRef: string): Promise<NullishRoom> {
    try {
      const room = await this.findRoomByRef(roomRef);
      if (!room) {
        throw new Error('RoomsService.addPlayerToRoom -> Room does not exist');
      }
      // validate player exists
      const userExists = await this.usersService.findUserByRef(playerRef);
      if (!userExists) {
        throw new Error('RoomsService.addPlayerToRoom -> Player does not exist');
      }
      // If player already in room, return existing room data
      const playerAlreadyInRoom =
        room.hostRef === playerRef || room.connectedPlayerRefs.includes(playerRef);
      if (playerAlreadyInRoom) {
        return room;
      }
      // validate room is open for joining
      if (!room.availableToJoin) {
        throw new Error('RoomsService.addPlayerToRoom -> Room not open for joining');
      }

      // otherwise, update room with new player
      return this.roomModel.findByIdAndUpdate(
        roomRef,
        { connectedPlayerRefs: [...room.connectedPlayerRefs, playerRef] },
        { new: true }
      );
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error, 'RoomsService.addPlayerToRoom -> Error adding player to room')
      );
    }
  }
}
