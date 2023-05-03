import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerGameDetailsDto } from './dto/create-player-game-details.dto';
import { UpdatePlayerGameDetailsDto } from './dto/update-player-game-details.dto';
import {
  PlayerGameDetails,
  PlayerGameDetailsDocument,
} from './schemas/player-game-details.schema';

@Injectable()
export class PlayerGameDetailsService {
  constructor(
    @InjectModel(PlayerGameDetails.name)
    private playerGameDetailsModel: Model<PlayerGameDetailsDocument>,
  ) {}

  async findDetailsByGameAndPlayer({
    gameId,
    playerId,
  }: {
    gameId: string;
    playerId: string;
  }): Promise<PlayerGameDetails | null> {
    return this.playerGameDetailsModel
      .findOne({ playerRef: playerId, gameRef: gameId })
      .exec();
  }

  async create({
    gameId,
    playerId,
    details,
  }: {
    gameId: string;
    playerId: string;
    details: CreatePlayerGameDetailsDto;
  }): Promise<PlayerGameDetails> {
    const createdPlayerGameDetails = new this.playerGameDetailsModel({
      gameRef: gameId,
      playerRef: playerId,
      ...details,
    });
    return createdPlayerGameDetails.save();
  }

  async updateById({
    id,
    updates,
  }: {
    id: string;
    updates: UpdatePlayerGameDetailsDto;
  }) {
    /**
     * NOTE: if this ever needs to be optimized for performance
     *       change new to false and simply merge the updates with
     *       the returned doc (which would be the old one)
     *
     * @see https://stackoverflow.com/a/30419860
     */

    return this.playerGameDetailsModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();
  }

  async findById(detailsId: string): Promise<PlayerGameDetails | null> {
    return this.playerGameDetailsModel.findById(detailsId).exec();
  }
}
