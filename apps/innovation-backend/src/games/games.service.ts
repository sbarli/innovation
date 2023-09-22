import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game, GameDocument } from './schemas/game.schema';

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  async create(createGameDto: Omit<Game, '_id'>): Promise<Game> {
    const createdGame = new this.gameModel(createGameDto);
    return createdGame.save();
  }

  async updateGameByRef({
    ref,
    gameUpdates,
  }: {
    ref: string;
    gameUpdates: UpdateGameDto;
  }): Promise<Game | null | undefined> {
    /**
     * NOTE: if this ever needs to be optimized for performance
     *       change new to false and simply merge the updates with
     *       the returned doc (which would be the old one)
     *
     * @see https://stackoverflow.com/a/30419860
     */

    return this.gameModel.findByIdAndUpdate(ref, gameUpdates, { new: true });
  }

  async findGameByRef(ref: string): Promise<Game | null | undefined> {
    return this.gameModel.findById(ref);
  }
}
