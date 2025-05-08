import { FC } from 'react';

import { Color } from '@inno/constants';

import { BoardPile as TBoardPile } from '../../../../app-core/types/game.types';
import { CardFrontWithDetails } from '../../../../cards/components/CardFrontWithDetails';
import { HorizontalEmptyCardSlot } from '../../../../cards/components/HorizontalEmptyCardSlot';
import { useCardsContext } from '../../../../cards/state/CardsProvider';

export interface IBoardPileProps {
  color: Color;
  pile: TBoardPile;
}
export const BoardPile: FC<IBoardPileProps> = ({ color, pile }) => {
  const { cards } = useCardsContext();
  if (!cards || !pile?.cardRefs?.[0]) {
    return <HorizontalEmptyCardSlot color={color} />;
  }

  const topCard = cards[pile.cardRefs[0]];

  return <CardFrontWithDetails card={topCard} />;
};
