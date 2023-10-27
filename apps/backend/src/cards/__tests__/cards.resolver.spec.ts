import { Test } from '@nestjs/testing';

import {
  MOCK_CARD_ID_AND_REF_BY_AGE,
  MOCK_CARD_REFS_BY_AGE,
} from '../__mocks__/cards-sorting.mock';
import { MOCK_CARD, createManyCards } from '../__mocks__/cards.mock';
import { CardsResolver } from '../cards.resolver';
import { FindOneByFieldOptions } from '../dto/find-one-options.input';
import { CardsSortingService } from '../services/cards-sorting.service';
import { CardsService } from '../services/cards.service';

const MOCK_SEEDED_CARDS = createManyCards({ numCards: 10 });

describe('CardsResolver', () => {
  let cardsService: CardsService;
  let cardsSortingService: CardsSortingService;
  let cardsResolver: CardsResolver;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CardsService,
          useValue: {
            findAll: jest.fn(() => MOCK_SEEDED_CARDS),
            findOneByCardId: jest.fn(() => MOCK_CARD),
            findOneByRef: jest.fn(() => MOCK_CARD),
          },
        },
        {
          provide: CardsSortingService,
          useValue: {
            refsByAge: jest.fn(() => MOCK_CARD_REFS_BY_AGE),
            cardIdAndRefByAge: jest.fn(() => MOCK_CARD_ID_AND_REF_BY_AGE),
          },
        },
        CardsResolver,
      ],
    }).compile();

    cardsService = moduleRef.get<CardsService>(CardsService);
    cardsSortingService = moduleRef.get<CardsSortingService>(CardsSortingService);
    cardsResolver = moduleRef.get<CardsResolver>(CardsResolver);
  });

  it('should be defined', () => {
    expect(cardsResolver).toBeDefined();
  });

  describe('queries', () => {
    describe('getAllCards', () => {
      it('should return output of calling cardsService.findAll()', async () => {
        const serviceSpy = jest.spyOn(cardsService, 'findAll');
        const output = await cardsResolver.getAllCards();
        expect(serviceSpy).toHaveBeenCalledTimes(1);
        expect(output).toEqual(MOCK_SEEDED_CARDS);
      });
    });

    describe('getCardRefsByAge', () => {
      it('should return output of calling cardsSortingService.refsByAge on output of cardsService.findAll', async () => {
        const cardsServiceeSpy = jest.spyOn(cardsService, 'findAll');
        const sortingServiceeSpy = jest.spyOn(cardsSortingService, 'refsByAge');
        const output = await cardsResolver.getCardRefsByAge();
        expect(cardsServiceeSpy).toHaveBeenCalledTimes(1);
        expect(sortingServiceeSpy).toHaveBeenCalledWith({ cards: MOCK_SEEDED_CARDS });
        expect(output).toEqual(MOCK_CARD_REFS_BY_AGE);
      });
    });

    describe('getCardIdAndRefByAge', () => {
      it('should return output of calling cardsSortingService.cardIdAndRefByAge on output of cardsService.findAll', async () => {
        const cardsServiceeSpy = jest.spyOn(cardsService, 'findAll');
        const sortingServiceeSpy = jest.spyOn(cardsSortingService, 'cardIdAndRefByAge');
        const output = await cardsResolver.getCardIdAndRefByAge();
        expect(cardsServiceeSpy).toHaveBeenCalledTimes(1);
        expect(sortingServiceeSpy).toHaveBeenCalledWith({ cards: MOCK_SEEDED_CARDS });
        expect(output).toEqual(MOCK_CARD_ID_AND_REF_BY_AGE);
      });
    });

    describe('getOneCard', () => {
      it('should throw error when searchField is invalid', async () => {
        const byCardIdSpy = jest.spyOn(cardsService, 'findOneByCardId');
        const byRefSpy = jest.spyOn(cardsService, 'findOneByRef');
        const output = async () =>
          await cardsResolver.getOneCard({
            searchField: 'bad-search-field' as FindOneByFieldOptions,
            searchValue: 'mock-card-id',
          });
        expect(output).rejects.toThrow('Invalid searchField provided');
        expect(byCardIdSpy).not.toHaveBeenCalled();
        expect(byRefSpy).not.toHaveBeenCalled();
      });

      it('should return output of calling cardsService.findOneByCardId on searchValue when searchField is `cardId`', async () => {
        const byCardIdSpy = jest.spyOn(cardsService, 'findOneByCardId');
        const byRefSpy = jest.spyOn(cardsService, 'findOneByRef');
        const output = await cardsResolver.getOneCard({
          searchField: 'cardId',
          searchValue: 'mock-card-id',
        });
        expect(byCardIdSpy).toHaveBeenCalledWith('mock-card-id');
        expect(byRefSpy).not.toHaveBeenCalled();
        expect(output).toEqual(MOCK_CARD);
      });

      it('should return output of calling cardsService.findOneByRef on searchValue when searchField is `ref`', async () => {
        const byCardIdSpy = jest.spyOn(cardsService, 'findOneByCardId');
        const byRefSpy = jest.spyOn(cardsService, 'findOneByRef');
        const output = await cardsResolver.getOneCard({
          searchField: 'ref',
          searchValue: 'mock-card-id',
        });
        expect(byCardIdSpy).not.toHaveBeenCalled();
        expect(byRefSpy).toHaveBeenCalledWith('mock-card-id');
        expect(output).toEqual(MOCK_CARD);
      });
    });
  });
});
