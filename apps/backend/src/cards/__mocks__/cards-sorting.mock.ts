import { CardRefsByAge } from '../dto/card-refs-by-age.dto';
import { CardIdAndRefByAge } from '../dto/cardId-and-ref-by-age.dto';

export const baseArrByAge = {
  ONE: [],
  TWO: [],
  THREE: [],
  FOUR: [],
  FIVE: [],
  SIX: [],
  SEVEN: [],
  EIGHT: [],
  NINE: [],
  TEN: [],
};

export const MOCK_CARD_REFS_BY_AGE: CardRefsByAge = Object.assign(
  {},
  {
    ...baseArrByAge,
    ONE: [
      'MOCK_REF-ONE-0',
      'MOCK_REF-ONE-1',
      'MOCK_REF-ONE-2',
      'MOCK_REF-ONE-3',
      'MOCK_REF-ONE-4',
      'MOCK_REF-ONE-5',
    ],
    TWO: [
      'MOCK_REF-TWO-0',
      'MOCK_REF-TWO-1',
      'MOCK_REF-TWO-2',
      'MOCK_REF-TWO-3',
      'MOCK_REF-TWO-4',
      'MOCK_REF-TWO-5',
    ],
    EIGHT: [
      'MOCK_REF-EIGHT-0',
      'MOCK_REF-EIGHT-1',
      'MOCK_REF-EIGHT-2',
      'MOCK_REF-EIGHT-3',
      'MOCK_REF-EIGHT-4',
      'MOCK_REF-EIGHT-5',
    ],
  }
);

export const MOCK_CARD_ID_AND_REF_BY_AGE: CardIdAndRefByAge = Object.assign(
  {},
  {
    ...baseArrByAge,
    ONE: [
      { cardId: 'MOCK_CARD_ID-ONE-0', ref: 'MOCK_ID-ONE-0' },
      { cardId: 'MOCK_CARD_ID-ONE-1', ref: 'MOCK_ID-ONE-1' },
    ],
    TWO: [{ cardId: 'MOCK_CARD_ID-TWO-0', ref: 'MOCK_ID-TWO-0' }],
    EIGHT: [
      { cardId: 'MOCK_CARD_ID-EIGHT-0', ref: 'MOCK_ID-EIGHT-0' },
      { cardId: 'MOCK_CARD_ID-EIGHT-1', ref: 'MOCK_ID-EIGHT-1' },
      { cardId: 'MOCK_CARD_ID-EIGHT-2', ref: 'MOCK_ID-EIGHT-2' },
    ],
  }
);
