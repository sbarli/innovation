import { Box } from '@gluestack-ui/themed';
import { StatusBar } from 'expo-status-bar';

import { Card, Game, PlayerGameDetails } from '@inno/gql';

import { DeckLayout } from '../deck/DeckLayout';

export interface IGameTrainingScreenProps {
  cards: Card[];
  game: Game;
  gameDetailsByPlayer: PlayerGameDetails[];
}

// eslint-disable-next-line prettier/prettier
export const GameTrainingScreen = ({ game }: IGameTrainingScreenProps) => {
  return (
    <>
      <StatusBar style="auto" />
      <Box alignItems="center">
        <DeckLayout deck={game.deck} />
      </Box>
    </>
  );
};
