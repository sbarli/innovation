import { StatusBar } from 'expo-status-bar';

import { Card, Game, PlayerGameDetails } from '@inno/gql';

import { DeckLayout } from '../deck/components/DeckLayout';
import { useDeckMetadata } from '../deck/hooks/useDeckMetadata';

import { Box } from '../app-core/components/gluestack/box';

export interface IGameTrainingScreenProps {
  cards: Card[];
  game: Game;
  gameDetailsByPlayer: PlayerGameDetails[];
}

export const GameTrainingScreen = ({ game }: IGameTrainingScreenProps) => {
  const { deckMetadata } = useDeckMetadata({ deck: game.deck });

  return (
    <>
      <StatusBar style="auto" />
      <Box className="items-center">
        <DeckLayout deckMetadata={deckMetadata} />
      </Box>
    </>
  );
};
