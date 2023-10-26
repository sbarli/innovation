import rawCardData from '../data/cards';
import { Card } from '../schemas/card.schema';

export const transformRawCardsToCardSchema = (): Card[] =>
  rawCardData.map((rc) => ({
    cardId: rc.cardId,
    name: rc.name,
    age: rc.age,
    dogmaResource: rc.dogmaResource,
    color: rc.color,
    resourceTotals: rc.resourceTotals,
    resourceSpaces: rc.resourceSpaces,
    dogmaEffects: rc.dogmaEffects,
  }));
