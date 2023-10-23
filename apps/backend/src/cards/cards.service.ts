import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card, CardDocument } from 'src/shared/schemas/card.schema';

import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  async findAll(): Promise<Card[]> {
    return this.cardModel.find({});
  }

  async findManyByRef(refs: string[]): Promise<Card[]> {
    return this.cardModel.find({
      _id: {
        $in: refs,
      },
    });
  }

  async findOneByRef(ref: string): Promise<Card | null | undefined> {
    return this.cardModel.findOne({ _id: ref });
  }

  async findOneByCardId(cardId: string): Promise<Card | null | undefined> {
    return this.cardModel.findOne({ cardId });
  }

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const createdCard = new this.cardModel(createCardDto);
    return createdCard.save();
  }

  // TODO: optimize this
  async createMany(cardsToCreate: CreateCardDto[]): Promise<Card[]> {
    return Promise.all(cardsToCreate.map((cardDto) => this.create(cardDto)));
  }

  async deleteAll() {
    return this.cardModel.deleteMany({});
  }
}
