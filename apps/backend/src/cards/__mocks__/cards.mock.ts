import { Card, CreateCardInput } from '../schemas/card.schema';

import { MOCK_DOGMA_EFFECT } from './dogma-effects.mock';
import { MOCK_RESOURCE_SPACES } from './resource-spaces.mock';
import { MOCK_RESOURCE_TOTALS } from './resource-totals.mock';

export const DEFAULT_ID = 'MOCK_ID';
export const DEFAULT_CARD_ID = 'MOCK_CARD_ID';
export const DEFAULT_CARD_NAME = 'Mock Card';

const baseMockCardData = Object.freeze({
  cardId: DEFAULT_CARD_ID,
  name: DEFAULT_CARD_NAME,
  age: 1,
  color: 'blue',
  dogmaResource: 'lightbulbs',
  resourceTotals: MOCK_RESOURCE_TOTALS,
  resourceSpaces: MOCK_RESOURCE_SPACES,
  dogmaEffects: [MOCK_DOGMA_EFFECT],
});

export const MOCK_CARD_INPUT: CreateCardInput = {
  ...baseMockCardData,
};

export const MOCK_CARD: Card = {
  ...baseMockCardData,
  _id: DEFAULT_ID,
};

export const createMockCard = (overrides: Partial<Card> = {}): Card => ({
  ...MOCK_CARD,
  ...overrides,
});

interface ICreateManyCardsProps {
  appendIdx?: boolean;
  globalOverrides?: Partial<Card>;
  numCards?: number;
}
export const createManyCards = ({
  appendIdx = true,
  globalOverrides = {},
  numCards = 1,
}: ICreateManyCardsProps = {}): Card[] => {
  return [...new Array(numCards)].map((_val, idx) => {
    if (!appendIdx) {
      return createMockCard({
        ...globalOverrides,
      });
    }
    return createMockCard({
      ...globalOverrides,
      _id: `${globalOverrides._id ?? DEFAULT_ID}-${idx}`,
      cardId: `${globalOverrides.cardId ?? DEFAULT_CARD_ID}-${idx}`,
      name: `${globalOverrides.name ?? DEFAULT_CARD_NAME}-${idx}`,
    });
  });
};
