/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: REMOVE ^^
import { AgeString } from '@inno/constants';
import { BoardFragment, Card, DeckFragment, PlayerGameDetailsFragment } from '@inno/gql';

import {
  Board,
  Cards,
  Player,
  PlayerMetadata,
  Players,
  PossibleActions,
  ResourceTotals,
} from '../../app-core/types/game.types';

const calculateResourceTotals = (playerBoard: BoardFragment, cards: Cards): ResourceTotals => {
  // TODO: add real logic
  return {
    CASTLES: 0,
    CROWNS: 0,
    LEAVES: 0,
    LIGHTBULBS: 0,
    FACTORIES: 0,
    TIMEPIECES: 0,
  };
};
const calculatePlayerAge = (playerBoard: BoardFragment, cards: Cards): number => {
  // TODO: add real logic
  return 1;
};
const calculatePlayerScore = (playerScorePile: string[], cards: Cards): number => {
  // TODO: add real logic
  return 0;
};
const determinePlayerPossibleActions = (
  playerData: PlayerGameDetailsFragment,
  cards: Cards,
  deck: DeckFragment
): PossibleActions => {
  // TODO: add real logic
  return {
    draw: AgeString.ONE,
    meld: [],
    dogma: [],
  };
};

const formatPlayerBoard = (playerBoard: BoardFragment): Board => {
  const formattedBoard = { ...playerBoard };
  delete formattedBoard.__typename;
  delete formattedBoard.blue.__typename;
  delete formattedBoard.green.__typename;
  delete formattedBoard.purple.__typename;
  delete formattedBoard.red.__typename;
  delete formattedBoard.yellow.__typename;
  return formattedBoard;
};

const formatPlayerMetadata = (
  playerData: PlayerGameDetailsFragment,
  cards: Cards,
  deck: DeckFragment
): PlayerMetadata => {
  return {
    age: calculatePlayerAge(playerData.board, cards),
    score: calculatePlayerScore(playerData.scorePile, cards),
    resourceTotals: calculateResourceTotals(playerData.board, cards),
    possibleActions: determinePlayerPossibleActions(playerData, cards, deck),
  };
};

const formatPlayer = (
  playerData: PlayerGameDetailsFragment,
  cards: Cards,
  deck: DeckFragment
): Player => {
  return {
    id: playerData._id,
    username: playerData.username ?? 'Unnamed user',
    hand: playerData.hand,
    board: formatPlayerBoard(playerData.board),
    metadata: formatPlayerMetadata(playerData, cards, deck),
  };
};

export const formatPlayers = ({
  cards,
  deck,
  playersGameData,
}: {
  cards: Cards;
  deck: DeckFragment;
  playersGameData: PlayerGameDetailsFragment[];
}): Players => {
  return playersGameData.reduce((acc, playerData) => {
    acc[playerData.playerRef] = formatPlayer(playerData, cards, deck);
    return acc;
  }, {} as Players);
};
