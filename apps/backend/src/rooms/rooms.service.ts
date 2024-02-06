import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

import { getCatchErrorMessage } from '@inno/utils';

import { UpdateRoomAvailabilityInput } from './dto/update-room-availability.dto';
import { PlayerRoomType } from './rooms.types';
import { NullishRoom, Room, RoomDocument } from './schemas/room.schema';

export interface ICreateRoomProps {
  roomName: string;
  user: UserWithoutPassword;
}

export interface IPlayerRoomProps {
  roomId: string;
  playerRef: string;
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
            playerRefs: {
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

  async createRoom({ roomName, user }: ICreateRoomProps): Promise<Room> {
    try {
      const duplicateRoom = await this.roomModel.findOne({
        hostRef: user._id,
        name: roomName,
      });
      if (duplicateRoom) {
        throw new Error('Room with this name already exists for this user');
      }
      const createdRoom = new this.roomModel({
        name: roomName,
        hostRef: user._id,
        playerRefs: [],
        availableToJoin: true,
      });
      return createdRoom.save();
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error, 'RoomsService.createRopm -> Error creating room')
      );
    }
  }

  async addPlayerToRoom({ playerRef, roomId }: IPlayerRoomProps): Promise<NullishRoom> {
    try {
      const room = await this.findRoomByRef(roomId);
      if (!room) {
        throw new Error('RoomsService.addPlayerToRoom -> Room does not exist');
      }
      // validate player exists
      const userExists = await this.usersService.findUserByRef(playerRef);
      if (!userExists) {
        throw new Error('RoomsService.addPlayerToRoom -> Player does not exist');
      }
      // If already in room, return existing room data
      const playerAlreadyInRoom = room.playerRefs.includes(playerRef);
      if (playerAlreadyInRoom) {
        return room;
      }
      // validate room is open for joining
      if (!room.availableToJoin) {
        throw new Error('RoomsService.addPlayerToRoom -> Room not open for joining');
      }

      const updateData: Partial<Room> = { playerRefs: [...room.playerRefs, playerRef] };

      // otherwise, update room with new player
      return this.roomModel.findByIdAndUpdate(roomId, updateData, { new: true });
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error, 'RoomsService.addPlayerToRoom -> Error adding player to room')
      );
    }
  }

  async closeRoom({ playerRef, roomId }: IPlayerRoomProps): Promise<NullishRoom> {
    try {
      const room = await this.findRoomByRef(roomId);
      if (!room) {
        throw new Error('RoomsService.closeRoom -> Room does not exist');
      }
      // validate player exists
      const userExists = await this.usersService.findUserByRef(playerRef);
      if (!userExists) {
        throw new Error('RoomsService.closeRoom -> Player does not exist');
      }
      // Make sure player is room host
      const playerIsHost = room.hostRef?.toString() === playerRef.toString();
      if (!playerIsHost) {
        throw new Error('RoomsService.closeRoom -> Only the host can close the room');
      }
      // Preserve the room record itself, but remove the references to players and sockets
      // Returns the original document for reference of players/host
      return this.roomModel.findByIdAndUpdate(roomId, {
        hostRef: null,
        playerRefs: [],
        availableToJoin: false,
      });
    } catch (error) {
      throw new Error(getCatchErrorMessage(error, 'RoomsService.closeRoom -> Error closing room'));
    }
  }

  async updateRoomAvailability({
    roomId,
    availableToJoin,
  }: UpdateRoomAvailabilityInput): Promise<NullishRoom> {
    try {
      return this.roomModel.findByIdAndUpdate(roomId, { availableToJoin }, { new: true });
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(
          error,
          'RoomsService.updateRoomAvailability -> Error updating room availability'
        )
      );
    }
  }

  async validateUserIsRoomHost(roomId: string, userRef: string): Promise<boolean> {
    try {
      const foundRoom = await this.roomModel.find({ _id: roomId, hostRef: userRef });
      if (!foundRoom) {
        return false;
      }
      return true;
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(
          error,
          'RoomsService.validateUserIsRoomHost -> Error checking if user is host of room'
        )
      );
    }
  }
}
