import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { VALID_PLAYER_ID_CHARACTERS } from '@inno/constants';

import { GetPlayersInput } from './dto/get-players.dto';
import { Player, PlayerDocument } from './schemas/player.schema';

export interface ICreatePlayer {
  name: string;
  playerId: string;
}

@Injectable()
export class PlayersService {
  constructor(@InjectModel(Player.name) private playerModel: Model<PlayerDocument>) {}

  async create(playerData: ICreatePlayer): Promise<Player> {
    const createdPlayer = new this.playerModel(playerData);
    return createdPlayer.save();
  }

  async createPlayers(newPlayersData: ICreatePlayer[]): Promise<Player[]> {
    return this.playerModel.insertMany(newPlayersData);
  }

  async findPlayerByRef(ref: string): Promise<Player | null | undefined> {
    return this.playerModel.findOne({ _id: ref });
  }

  async findPlayerByPlayerId(playerId: string): Promise<Player | null | undefined> {
    return this.playerModel.findOne({ playerId });
  }

  async findPlayers(searchData: GetPlayersInput): Promise<Player[]> {
    return this.playerModel.find({ [searchData.searchField]: { $in: searchData.searchValues } });
  }

  getPlayerIdFromName(name: string): string {
    const loweredTrimmedPlayerName = name.toLowerCase().trim();
    const playerId = loweredTrimmedPlayerName.split('').reduce((acc, char: string) => {
      if (VALID_PLAYER_ID_CHARACTERS[char]) {
        acc += char;
      }
      return acc;
    }, '');
    return playerId;
  }
}
