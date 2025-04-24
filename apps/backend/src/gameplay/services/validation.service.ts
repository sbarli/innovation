import { Injectable } from '@nestjs/common';

import { getCatchErrorMessage } from '@inno/utils';

import { RoomsService } from 'src/rooms/rooms.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class VaildationService {
  constructor(
    private roomsService: RoomsService,
    private usersService: UsersService
  ) {}

  async validateRoomExists(roomRef: string): Promise<boolean> {
    try {
      const foundRoom = await this.roomsService.findRoomByRef(roomRef);
      if (!foundRoom) {
        throw new Error('Room not found');
      }
      return true;
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error) ??
          'validationService.validateRoomExists: Unable to validate room exists'
      );
    }
  }

  async validatePlayersExist(playerRefs: string[]): Promise<boolean> {
    try {
      const foundPlayers = await this.usersService.findUsers({
        searchField: 'ref',
        searchValues: playerRefs,
      });
      if (foundPlayers?.length !== playerRefs.length) {
        throw new Error('One or more players not found');
      }
      return true;
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error) ??
          'validationService.validatePlayersExist: Unable to validate players exist'
      );
    }
  }
}
