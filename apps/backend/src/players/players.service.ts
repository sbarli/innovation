import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePlayerDto } from './dto/create-player.dto';
import { Player, PlayerDocument } from './schemas/player.schema';

@Injectable()
export class PlayersService {
  constructor(@InjectModel(Player.name) private playerModel: Model<PlayerDocument>) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const createdPlayer = new this.playerModel(createPlayerDto);
    return createdPlayer.save();
  }

  async findPlayerByRef(ref: string): Promise<Player | null | undefined> {
    return this.playerModel.findOne({ _id: ref }).exec();
  }

  async findPlayerByPlayerId(playerId: string): Promise<Player | null | undefined> {
    return this.playerModel.findOne({ playerId });
  }
}
