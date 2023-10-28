import { Test } from '@nestjs/testing';
import { createManyCards } from 'src/cards/__mocks__/cards.mock';
import { MOCK_DOUBLE_RESOURCE_TOTALS } from 'src/cards/__mocks__/resource-totals.mock';
import { CardsService } from 'src/cards/services/cards.service';

import { ResourcesService } from '../services/resources.service';

const MOCK_CARDS = createManyCards({ numCards: 2 });
const MOCK_CARD_REFS = MOCK_CARDS.map((card) => card._id);

describe('ResourcesService', () => {
  let cardsService: CardsService;
  let resourcesService: ResourcesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CardsService,
          useValue: {
            findManyByRef: jest.fn(),
          },
        },
        ResourcesService,
      ],
    }).compile();

    cardsService = moduleRef.get<CardsService>(CardsService);
    resourcesService = moduleRef.get<ResourcesService>(ResourcesService);
  });

  it('should be defined', () => {
    expect(resourcesService).toBeDefined();
  });

  describe('calculateResourceTotals', () => {
    it('should return correct resource totals for passed cardRefs', async () => {
      const findCardsSpy = jest
        .spyOn(cardsService, 'findManyByRef')
        .mockResolvedValueOnce(MOCK_CARDS);

      const output = await resourcesService.calculateResourceTotals(MOCK_CARD_REFS);

      expect(findCardsSpy).toHaveBeenCalledWith(MOCK_CARD_REFS);
      expect(output).toEqual(MOCK_DOUBLE_RESOURCE_TOTALS);
    });
  });
});
