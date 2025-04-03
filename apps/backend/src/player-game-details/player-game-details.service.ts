import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UpdatePlayerGameDetailsInput } from './dto/update-player-game-details.dto';
import {
  CreatePlayerGameDetailsInput,
  PlayerGameDetails,
  PlayerGameDetailsDocument,
} from './schemas/player-game-details.schema';

@Injectable()
export class PlayerGameDetailsService {
  constructor(
    @InjectModel(PlayerGameDetails.name)
    private playerGameDetailsModel: Model<PlayerGameDetailsDocument>
  ) {}

  async findById(id: string): Promise<PlayerGameDetails | null | undefined> {
    return this.playerGameDetailsModel.findById(id);
  }

  async findDetailsByGameAndPlayer({
    gameRef,
    playerRef,
  }: {
    gameRef: string;
    playerRef: string;
  }): Promise<PlayerGameDetails | null | undefined> {
    return this.playerGameDetailsModel.findOne({
      playerRef,
      gameRef,
    });
  }

  async findDetailsByGame({ gameRef }: { gameRef: string }): Promise<PlayerGameDetails[]> {
    return this.playerGameDetailsModel.find({
      gameRef,
    });
  }

  async create(detailsToCreate: CreatePlayerGameDetailsInput): Promise<PlayerGameDetails> {
    const createdPlayerGameDetails = new this.playerGameDetailsModel(detailsToCreate);
    return createdPlayerGameDetails.save();
  }

  async updateById({
    id,
    updates,
  }: {
    id: string;
    updates: UpdatePlayerGameDetailsInput;
  }): Promise<PlayerGameDetails | null | undefined> {
    /**
     * NOTE: if this ever needs to be optimized for performance
     *       change new to false and simply merge the updates with
     *       the returned doc (which would be the old one)
     *
     * @see https://stackoverflow.com/a/30419860
     */

    return this.playerGameDetailsModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
  }
}
