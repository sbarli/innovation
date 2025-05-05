/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: REMOVE ^^
import { AgeDataByAgeNum, AgeNum, IAgeDataItem } from '@inno/constants';
import { BoardFragment, DeckFragment, PlayerGameDetailsFragment } from '@inno/gql';

import {
  Board,
  Cards,
  Deck,
  Hand,
  Player,
  PlayerMetadata,
  PossibleActions,
  ResourceTotals,
} from '../../app-core/types/game.types';
import { whichDrawPile } from '../../deck/helpers/whichDrawPile';

import { recurseRemoveTypename } from './recurseRemoveTypename';

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
const calculatePlayerAge = (playerBoard: Board, cards: Cards): IAgeDataItem => {
  const DEFAULT_AGE: AgeNum = 1;
  const ageNum: AgeNum = Object.keys(playerBoard).reduce((curHighest, color) => {
    const maybeCardId = playerBoard[color as keyof Board]?.cardRefs?.[0];
    if (maybeCardId && cards[maybeCardId]?.age && cards[maybeCardId].age > curHighest) {
      return cards[maybeCardId].age;
    }
    return curHighest;
  }, DEFAULT_AGE);
  return AgeDataByAgeNum[ageNum];
};
const calculatePlayerScore = (playerScorePile: string[], cards: Cards): number => {
  return playerScorePile.reduce((curScore, cardId) => {
    if (cards[cardId]) {
      return curScore + cards[cardId].age;
    }
    return curScore;
  }, 0);
};

const determinePlayerPossibleActions = (
  playerData: PlayerGameDetailsFragment,
  age: IAgeDataItem,
  cards: Cards,
  deck: Deck,
  score: number
): PossibleActions => {
  return {
    draw: whichDrawPile({ deck, currentPlayerAge: age.str }),
    meld: [],
    dogma: [],
    achieve: [],
  };
};

const formatPlayerMetadata = (
  playerData: PlayerGameDetailsFragment,
  cards: Cards,
  deck: Deck
): PlayerMetadata => {
  const age = calculatePlayerAge(recurseRemoveTypename(playerData.board), cards);
  const score = calculatePlayerScore(playerData.scorePile, cards);
  return {
    age,
    score,
    resourceTotals: calculateResourceTotals(playerData.board, cards),
    possibleActions: determinePlayerPossibleActions(playerData, age, cards, deck, score),
    numAchievements: playerData.ageAchievements.length,
    numSpecialAchievements: playerData.specialAchievements.length,
  };
};

const formatPlayer = (
  playerData: PlayerGameDetailsFragment,
  cards: Cards,
  deck: Deck
): Player & { hand: Hand; board: Board } => {
  return {
    playerId: playerData.playerRef,
    detailsRecordRef: playerData._id,
    username: playerData.username ?? 'Unnamed user',
    hand: playerData.hand,
    board: recurseRemoveTypename(playerData.board),
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
}): Array<Player & { hand: Hand; board: Board }> => {
  return playersGameData.map((playerData) =>
    formatPlayer(playerData, cards, recurseRemoveTypename(deck))
  );
};
