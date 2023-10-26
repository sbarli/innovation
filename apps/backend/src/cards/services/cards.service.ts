import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { getCatchErrorMessage } from '@inno/utils';

import { transformRawCardsToCardSchema } from '../helpers/transform-raw-cards-to-card-schema';
import { Card, CardDocument } from '../schemas/card.schema';

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

  async create(createCardDto: Omit<Card, '_id'>): Promise<Card> {
    const createdCard = new this.cardModel(createCardDto);
    return createdCard.save();
  }

  async createMany(cardsToCreate: Omit<Card, '_id'>[]): Promise<Card[]> {
    return this.cardModel.insertMany(cardsToCreate);
  }

  async deleteAll() {
    return this.cardModel.deleteMany({});
  }

  async seedCards(): Promise<Card[]> {
    const session = await this.cardModel.startSession();
    try {
      const cardsToSeed = transformRawCardsToCardSchema();
      session.startTransaction();
      await this.deleteAll();
      const createdCards = await this.createMany(cardsToSeed);
      await session.commitTransaction();
      return createdCards;
    } catch (error) {
      await session.abortTransaction();
      throw new Error(
        getCatchErrorMessage(error) ??
          'cardsService.seedCards: Could not seed cards. Transaction aborted.'
      );
    } finally {
      await session.endSession();
    }
  }
}
