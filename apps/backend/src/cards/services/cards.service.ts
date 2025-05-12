import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';

import { Nullable } from '@inno/constants';
import { getCatchErrorMessage } from '@inno/utils';

import { CARDS_CACHE_TTL, CardCacheKey } from '../cards.constants';
import { transformRawCardsToCardSchema } from '../helpers/transform-raw-cards-to-card-schema';
import { Card, CardDocument, CreateCardInput } from '../schemas/card.schema';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
    @Inject(CACHE_MANAGER) protected cacheManager: Cache
  ) {}

  async findAll(): Promise<Card[]> {
    const cardsCache: Nullable<Card[]> = await this.cacheManager.get(CardCacheKey.ALL_CARDS);
    if (cardsCache) {
      return cardsCache;
    }
    const allCards = await this.cardModel.find({}).lean();
    await this.cacheManager.set(CardCacheKey.ALL_CARDS, allCards, CARDS_CACHE_TTL);
    return allCards;
  }

  async findManyByRef(refs: string[]): Promise<Card[]> {
    return this.cardModel
      .find({
        _id: {
          $in: refs,
        },
      })
      .lean();
  }

  async findOneByRef(ref: string): Promise<Nullable<Card>> {
    const cacheValue: Nullable<Card> = await this.cacheManager.get(
      `${CardCacheKey.CARD_REF}-${ref}`
    );
    if (cacheValue) {
      return cacheValue;
    }
    const card = await this.cardModel.findOne({ _id: ref }).lean();
    await this.cacheManager.set(`${CardCacheKey.CARD_REF}-${ref}`, card, CARDS_CACHE_TTL);
    return card;
  }

  async findOneByCardId(cardId: string): Promise<Nullable<Card>> {
    const cacheValue: Nullable<Card> = await this.cacheManager.get(
      `${CardCacheKey.CARD_ID}-${cardId}`
    );
    if (cacheValue) {
      return cacheValue;
    }
    const card = this.cardModel.findOne({ cardId }).lean();
    await this.cacheManager.set(`${CardCacheKey.CARD_ID}-${cardId}`, card, CARDS_CACHE_TTL);
    return card;
  }

  async createMany(cardsToCreate: CreateCardInput[]): Promise<Card[]> {
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
      // clear cards cache
      await this.cacheManager.del(CardCacheKey.ALL_CARDS);
    }
  }
}
