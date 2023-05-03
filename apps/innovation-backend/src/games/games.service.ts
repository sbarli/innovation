import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGameDto } from './dto/create-game.dto';
import { SetWinnerDto } from './dto/set-winner.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game, GameDocument } from './schemas/game.schema';

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const createdGame = new this.gameModel(createGameDto);
    return createdGame.save();
  }

  async updateById({
    id,
    gameUpdates,
  }: {
    id: string;
    gameUpdates: UpdateGameDto | SetWinnerDto | UpdateDeckDto;
  }) {
    /**
     * NOTE: if this ever needs to be optimized for performance
     *       change new to false and simply merge the updates with
     *       the returned doc (which would be the old one)
     *
     * @see https://stackoverflow.com/a/30419860
     */

    return this.gameModel
      .findByIdAndUpdate(id, gameUpdates, { new: true })
      .exec();
  }

  async findOneById(id: string): Promise<Game | null> {
    return this.gameModel.findById(id).exec();
  }
}
