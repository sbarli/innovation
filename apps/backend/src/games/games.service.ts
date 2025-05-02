import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { getCatchErrorMessage } from '@inno/utils';

import { UpdateGameInput } from './dto/update-game.dto';
import { CreateGameInput, Game, GameDocument } from './schemas/game.schema';

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  async findGameById(id: string): Promise<Game | null | undefined> {
    try {
      return this.gameModel.findById(id).lean();
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error, 'GamesService.findGameById -> Error finding game')
      );
    }
  }

  async findGameByRoomRef(roomRef: string): Promise<Game | null | undefined> {
    try {
      return this.gameModel.findOne({ roomRef }).lean();
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error, 'GamesService.findGameByRoomRef -> Error finding game')
      );
    }
  }

  async findActiveGameByPlayers(playerRefs: string[]): Promise<Game | null | undefined> {
    return this.gameModel
      .findOne({
        $and: [
          { playerRefs: { $all: [...playerRefs] } },
          {
            $or: [{ winnerRef: { $exists: false } }, { winnerRef: { $eq: null } }],
          },
        ],
      })
      .lean();
  }

  async create(newGameData: CreateGameInput): Promise<Game> {
    const createdGame = new this.gameModel(newGameData);
    return createdGame.save();
  }

  async updateGameByRef({
    ref,
    gameUpdates,
  }: {
    ref: string;
    gameUpdates: UpdateGameInput;
  }): Promise<Game | null | undefined> {
    /**
     * NOTE: if this ever needs to be optimized for performance
     *       change new to false and simply merge the updates with
     *       the returned doc (which would be the old one)
     *
     * @see https://stackoverflow.com/a/30419860
     */

    return this.gameModel.findByIdAndUpdate(ref, gameUpdates, { new: true }).lean();
  }
}
