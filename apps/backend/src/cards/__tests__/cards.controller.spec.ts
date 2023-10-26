import { Test } from '@nestjs/testing';

import { createManyCards } from '../__mocks__/cards.mock';
import { CardsController } from '../cards.controller';
import { CardsService } from '../services/cards.service';

const MOCK_SEEDED_CARDS = createManyCards({ numCards: 10 });

describe('CardsController', () => {
  let cardsService: CardsService;
  let cardsController: CardsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CardsService,
          useValue: {
            seedCards: jest.fn(() => MOCK_SEEDED_CARDS),
          },
        },
        CardsController,
      ],
    }).compile();

    cardsService = moduleRef.get<CardsService>(CardsService);
    cardsController = moduleRef.get<CardsController>(CardsController);
  });

  it('should be defined', () => {
    expect(cardsController).toBeDefined();
  });

  describe('GET', () => {
    describe('/cards', () => {
      it('should return output of calling cardsService.seedCards()', async () => {
        const serviceSpy = jest.spyOn(cardsService, 'seedCards');
        const output = await cardsController.seedCards();
        expect(serviceSpy).toHaveBeenCalledTimes(1);
        expect(output).toEqual(MOCK_SEEDED_CARDS);
      });
    });
  });
});
