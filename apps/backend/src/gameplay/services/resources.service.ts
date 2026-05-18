import { Injectable } from '@nestjs/common';
import type { Board, CardResourceSpaces, TypedCard } from '@inno/db-schema';
import type { CardResourceTotals } from '@inno/db-schema';

@Injectable()
export class ResourcesService {
  getHighestBoardAge(board: Board, cardMap: Map<string, TypedCard>): number {
    let highest = 0;
    for (const pile of Object.values(board)) {
      if (pile.cards.length > 0) {
        const topCardId = pile.cards[0];
        const card = cardMap.get(topCardId);
        if (card && card.age > highest) {
          highest = card.age;
        }
      }
    }
    return highest;
  }

  countResourcesOnBoard(board: Board, cardMap: Map<string, TypedCard>): CardResourceTotals {
    const totals: CardResourceTotals = {
      castles: 0, crowns: 0, leaves: 0, lightbulbs: 0, factories: 0, timepieces: 0,
    };

    for (const pile of Object.values(board)) {
      if (pile.cards.length === 0) continue;

      // Top card: all non-null resource spaces count
      const topCard = cardMap.get(pile.cards[0]);
      if (topCard) {
        this.addVisibleSpaces(totals, topCard.resourceSpaces, [1, 2, 3, 4]);
      }
    }

    return totals;
  }

  private addVisibleSpaces(
    totals: CardResourceTotals,
    spaces: CardResourceSpaces,
    slots: (1 | 2 | 3 | 4)[],
  ): void {
    for (const slot of slots) {
      const value = spaces[`resourceSpace${slot}` as keyof CardResourceSpaces];
      if (value && value in totals) {
        totals[value as keyof CardResourceTotals]++;
      }
    }
  }
}
