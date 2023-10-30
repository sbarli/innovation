import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePlayerInput } from './dto/create-player.dto';
import { GetPlayersInput } from './dto/get-players.dto';
import { Player, PlayerDocument } from './schemas/player.schema';

@Injectable()
export class PlayersService {
  constructor(@InjectModel(Player.name) private playerModel: Model<PlayerDocument>) {}

  async create(newPlayerData: CreatePlayerInput): Promise<Player> {
    const createdPlayer = new this.playerModel(newPlayerData);
    return createdPlayer.save();
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
}
