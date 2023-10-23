import { Injectable } from '@nestjs/common';

import { AgeString, cardAgeToAgeStringMap } from '@inno/constants';

import { CardRefsByAge } from '../dto/card-refs-by-age.dto';
import { CardIdAndRefByAge } from '../dto/cardId-and-ref-by-age.dto';
import { Card } from '../schemas/card.schema';

@Injectable()
export class CardsSortingService {
  refsByAge({ cards }: { cards: Card[] }): CardRefsByAge {
    const baseObject: CardRefsByAge = {
      [AgeString.ONE]: [],
      [AgeString.TWO]: [],
      [AgeString.THREE]: [],
      [AgeString.FOUR]: [],
      [AgeString.FIVE]: [],
      [AgeString.SIX]: [],
      [AgeString.SEVEN]: [],
      [AgeString.EIGHT]: [],
      [AgeString.NINE]: [],
      [AgeString.TEN]: [],
    };
    return cards.reduce((acc, card) => {
      acc[cardAgeToAgeStringMap[card.age]].push(card._id);
      return acc;
    }, baseObject);
  }

  cardIdAndRefByAge({ cards }: { cards: Card[] }): CardIdAndRefByAge {
    const baseObject: CardIdAndRefByAge = {
      [AgeString.ONE]: [],
      [AgeString.TWO]: [],
      [AgeString.THREE]: [],
      [AgeString.FOUR]: [],
      [AgeString.FIVE]: [],
      [AgeString.SIX]: [],
      [AgeString.SEVEN]: [],
      [AgeString.EIGHT]: [],
      [AgeString.NINE]: [],
      [AgeString.TEN]: [],
    };
    return cards.reduce((acc, card) => {
      const cardDataToReturn = {
        cardId: card.cardId,
        ref: card._id,
      };
      acc[cardAgeToAgeStringMap[card.age]].push(cardDataToReturn);
      return acc;
    }, baseObject);
  }
}
