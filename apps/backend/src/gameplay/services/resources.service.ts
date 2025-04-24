import { Injectable } from '@nestjs/common';

import { getCatchErrorMessage } from '@inno/utils';

import { ResourceTotals } from 'src/cards/schemas/resource-totals.schema';
import { CardsService } from 'src/cards/services/cards.service';

import { baseResourceTotals } from '../constants/resource-totals';

@Injectable()
export class ResourcesService {
  constructor(private cardsService: CardsService) {}

  async calculateResourceTotals(cardRefs: string[]): Promise<ResourceTotals> {
    try {
      const resourceTotals = { ...baseResourceTotals };
      const cards = await this.cardsService.findManyByRef(cardRefs);

      if (cards.length !== cardRefs.length) {
        throw new Error('calculateResourceTotals failed: one or more card refs invalid');
      }

      cards.forEach((card) => {
        resourceTotals.castles += card.resourceTotals.castles;
        resourceTotals.crowns += card.resourceTotals.crowns;
        resourceTotals.leaves += card.resourceTotals.leaves;
        resourceTotals.lightbulbs += card.resourceTotals.lightbulbs;
        resourceTotals.factories += card.resourceTotals.factories;
        resourceTotals.timepieces += card.resourceTotals.timepieces;
      });

      return resourceTotals;
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error) ??
          'resourcesService.calculateResourceTotals: Could not calculate resource totals'
      );
    }
  }
}
