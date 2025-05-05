import { Injectable } from '@nestjs/common';

import { Age, AgeDataByAgeNum, AgeNum } from '@inno/constants';

import { CardRefsByAge } from '../dto/card-refs-by-age.dto';
import { CardIdAndRefByAge } from '../dto/cardId-and-ref-by-age.dto';
import { Card } from '../schemas/card.schema';

@Injectable()
export class CardsSortingService {
  refsByAge({ cards }: { cards: Card[] }): CardRefsByAge {
    const baseObject: CardRefsByAge = {
      [Age.ONE]: [],
      [Age.TWO]: [],
      [Age.THREE]: [],
      [Age.FOUR]: [],
      [Age.FIVE]: [],
      [Age.SIX]: [],
      [Age.SEVEN]: [],
      [Age.EIGHT]: [],
      [Age.NINE]: [],
      [Age.TEN]: [],
    };
    return cards.reduce((acc, card) => {
      const cardAgeStr = AgeDataByAgeNum[card.age as AgeNum].str;
      acc[cardAgeStr].push(card._id);
      return acc;
    }, baseObject);
  }

  cardIdAndRefByAge({ cards }: { cards: Card[] }): CardIdAndRefByAge {
    const baseObject: CardIdAndRefByAge = {
      [Age.ONE]: [],
      [Age.TWO]: [],
      [Age.THREE]: [],
      [Age.FOUR]: [],
      [Age.FIVE]: [],
      [Age.SIX]: [],
      [Age.SEVEN]: [],
      [Age.EIGHT]: [],
      [Age.NINE]: [],
      [Age.TEN]: [],
    };
    return cards.reduce((acc, card) => {
      const cardDataToReturn = {
        cardId: card.cardId,
        ref: card._id,
      };
      const cardAgeStr = AgeDataByAgeNum[card.age as AgeNum].str;
      acc[cardAgeStr].push(cardDataToReturn);
      return acc;
    }, baseObject);
  }
}
