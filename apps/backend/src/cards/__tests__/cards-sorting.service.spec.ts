import { Test } from '@nestjs/testing';

import { createManyCards } from '../__mocks__/cards.mock';
import { CardsSortingService } from '../services/cards-sorting.service';

const baseArrByAge = {
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

const mockAge1Cards = createManyCards({ numCards: 2 });
const mockAge2Cards = createManyCards({ numCards: 1, globalOverrides: { age: 2 } });
const mockAge8Cards = createManyCards({ numCards: 3, globalOverrides: { age: 8 } });
const mockCardSet = [...mockAge8Cards, ...mockAge1Cards, ...mockAge2Cards];

describe('CardsSortingService', () => {
  let cardsSortingService: CardsSortingService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CardsSortingService],
    }).compile();

    cardsSortingService = moduleRef.get<CardsSortingService>(CardsSortingService);
  });

  it('should be defined', () => {
    expect(cardsSortingService).toBeDefined();
  });

  describe('refsByAge', () => {
    it('should return empty arrays per age when no cards are passed', () => {
      const output = cardsSortingService.refsByAge({ cards: [] });
      expect(output).toEqual({
        ...baseArrByAge,
      });
    });

    it('should return card refs sorted by age', () => {
      const output = cardsSortingService.refsByAge({
        cards: mockCardSet,
      });
      expect(output).toEqual({
        ...baseArrByAge,
        ONE: ['MOCK_ID-0', 'MOCK_ID-1'],
        TWO: ['MOCK_ID-0'],
        EIGHT: ['MOCK_ID-0', 'MOCK_ID-1', 'MOCK_ID-2'],
      });
    });
  });

  describe('cardIdAndRefByAge', () => {
    it('should return empty arrays per age when no cards are passed', () => {
      const output = cardsSortingService.cardIdAndRefByAge({ cards: [] });
      expect(output).toEqual({
        ...baseArrByAge,
      });
    });

    it('should return card refs sorted by age', () => {
      const output = cardsSortingService.cardIdAndRefByAge({
        cards: mockCardSet,
      });
      expect(output).toEqual({
        ...baseArrByAge,
        ONE: [
          { cardId: 'MOCK_CARD_ID-0', ref: 'MOCK_ID-0' },
          { cardId: 'MOCK_CARD_ID-1', ref: 'MOCK_ID-1' },
        ],
        TWO: [{ cardId: 'MOCK_CARD_ID-0', ref: 'MOCK_ID-0' }],
        EIGHT: [
          { cardId: 'MOCK_CARD_ID-0', ref: 'MOCK_ID-0' },
          { cardId: 'MOCK_CARD_ID-1', ref: 'MOCK_ID-1' },
          { cardId: 'MOCK_CARD_ID-2', ref: 'MOCK_ID-2' },
        ],
      });
    });
  });
});
