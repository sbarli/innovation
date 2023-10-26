import { Card } from '../schemas/card.schema';

import { MOCK_DOGMA_EFFECT } from './dogma-effects.mock';
import { MOCK_RESOURCE_SPACES } from './resource-spaces.mock';
import { MOCK_RESOURCE_TOTALS } from './resource-totals.mock';

export const DEFAULT_ID = 'MOCK_ID';
export const DEFAULT_CARD_ID = 'MOCK_CARD_ID';
export const DEFAULT_CARD_NAME = 'Mock Card';

export const MOCK_CARD: Card = {
  _id: undefined,
  cardId: DEFAULT_CARD_ID,
  name: DEFAULT_CARD_NAME,
  age: 1,
  color: 'blue',
  dogmaResource: 'lightbulbs',
  resourceTotals: MOCK_RESOURCE_TOTALS,
  resourceSpaces: MOCK_RESOURCE_SPACES,
  dogmaEffects: [MOCK_DOGMA_EFFECT],
};

export const createMockCard = (overrides: Partial<Card> = {}): Card => ({
  ...MOCK_CARD,
  ...overrides,
});

interface ICreateManyCardsProps {
  appendIdx?: boolean;
  globalOverrides?: Partial<Card>;
  includeId?: boolean;
  numCards?: number;
}
export const createManyCards = ({
  appendIdx = true,
  globalOverrides = {},
  includeId = true,
  numCards = 1,
}: ICreateManyCardsProps = {}): Card[] => {
  return [...new Array(numCards)].map((_val, idx) => {
    if (!appendIdx) {
      return createMockCard({
        ...globalOverrides,
        _id: includeId ? globalOverrides._id ?? DEFAULT_ID : undefined,
      });
    }
    return createMockCard({
      ...globalOverrides,
      _id: includeId ? `${globalOverrides._id ?? DEFAULT_ID}-${idx}` : undefined,
      cardId: `${globalOverrides.cardId ?? DEFAULT_CARD_ID}-${idx}`,
      name: `${globalOverrides.name ?? DEFAULT_CARD_NAME}-${idx}`,
    });
  });
};
