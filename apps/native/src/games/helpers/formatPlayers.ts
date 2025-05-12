import { AgeDataByAgeNum, AgeDataByAgeStr, AgeNum, IAgeDataItem, Resource } from '@inno/constants';
import { Card, PlayerGameDetailsFragment, SplayOption } from '@inno/gql';

import {
  AgeAchievementKey,
  AgeAchievements,
  Board,
  Cards,
  Hand,
  Player,
  PlayerMetadata,
  PossibleActions,
  ResourceTotals,
} from '../../app-core/types/game.types';

import { recurseRemoveTypename } from './recurseRemoveTypename';

const calculateResourceTotals = (playerBoard: Board, cards: Cards): ResourceTotals => {
  const totals = {
    [Resource.CASTLES]: 0,
    [Resource.CROWNS]: 0,
    [Resource.LEAVES]: 0,
    [Resource.LIGHTBULBS]: 0,
    [Resource.FACTORIES]: 0,
    [Resource.TIMEPIECES]: 0,
  };
  const addToTotals = (card: Card, side?: SplayOption | null) => {
    switch (side) {
      // Resource space 4 = exposed resource when splayed LEFT
      case SplayOption.Left:
        if (card.resourceSpaces.resourceSpace4) {
          totals[card.resourceSpaces.resourceSpace4 as Resource] += 1;
        }
        break;
      // Resource spaces 1 & 2 = exposed resource when splayed RIGHT
      case SplayOption.Right:
        if (card.resourceSpaces.resourceSpace1) {
          totals[card.resourceSpaces.resourceSpace1 as Resource] += 1;
        }
        if (card.resourceSpaces.resourceSpace2) {
          totals[card.resourceSpaces.resourceSpace2 as Resource] += 1;
        }
        break;
      // Resource spaces 2, 3, & 4 = exposed resource when splayed UP
      case SplayOption.Up:
        if (card.resourceSpaces.resourceSpace2) {
          totals[card.resourceSpaces.resourceSpace2 as Resource] += 1;
        }
        if (card.resourceSpaces.resourceSpace3) {
          totals[card.resourceSpaces.resourceSpace3 as Resource] += 1;
        }
        if (card.resourceSpaces.resourceSpace4) {
          totals[card.resourceSpaces.resourceSpace4 as Resource] += 1;
        }
        break;
      // NOT SPLAYED, ADD ALL RESOURCE TOTALS
      default:
        totals[Resource.CASTLES] += card.resourceTotals[Resource.CASTLES];
        totals[Resource.CROWNS] += card.resourceTotals[Resource.CROWNS];
        totals[Resource.LEAVES] += card.resourceTotals[Resource.LEAVES];
        totals[Resource.LIGHTBULBS] += card.resourceTotals[Resource.LIGHTBULBS];
        totals[Resource.FACTORIES] += card.resourceTotals[Resource.FACTORIES];
        totals[Resource.TIMEPIECES] += card.resourceTotals[Resource.TIMEPIECES];
    }
  };
  Object.keys(playerBoard).forEach((color) => {
    const pile = playerBoard[color as keyof Board];
    if (!pile?.cardRefs?.length) {
      return;
    }
    const topCard = cards[pile.cardRefs[0]];
    addToTotals(topCard);
    if (pile.splayed) {
      const remainingCardsInPile = pile.cardRefs.slice(1).map((cardId) => cards[cardId]);
      remainingCardsInPile.forEach((card) => addToTotals(card, pile.splayed));
    }
  });
  return totals;
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
const determineCardsAvailableToDogma = (playerBoard: Board, cards: Cards): string[] => {
  const cardIdsOnTopOfBoard = Object.keys(playerBoard).reduce((acc, color) => {
    const maybeCardId = playerBoard[color as keyof Board]?.cardRefs?.[0];
    if (maybeCardId && cards[maybeCardId]) {
      acc.push(maybeCardId);
    }
    return acc;
  }, [] as string[]);
  return cardIdsOnTopOfBoard;
};
const determineAvailableAgeAchievements = (
  playerAge: IAgeDataItem,
  playerScore: number,
  ageAchievementData?: AgeAchievements
): AgeAchievementKey[] => {
  if (!ageAchievementData) {
    return [];
  }
  const possibleAchivements = [
    AgeAchievementKey.ONE,
    AgeAchievementKey.TWO,
    AgeAchievementKey.THREE,
    AgeAchievementKey.FOUR,
    AgeAchievementKey.FIVE,
    AgeAchievementKey.SIX,
    AgeAchievementKey.SEVEN,
    AgeAchievementKey.EIGHT,
    AgeAchievementKey.NINE,
  ];

  return possibleAchivements.reduce((acc, achKey) => {
    // REQUIREMENTS:
    //  - achievement has a cost (i.e. not TEN age)
    //  - achievement not yet claimed
    //  - player is at least of age
    //  - player has enough score
    const achAgeNum = AgeDataByAgeStr[achKey].num;
    const achCost = AgeDataByAgeStr[achKey].costToAchieve;
    if (
      achCost &&
      !ageAchievementData[achKey].claimedBy &&
      playerAge.num >= achAgeNum &&
      playerScore >= achCost
    ) {
      acc.push(achKey);
    }

    return acc;
  }, [] as AgeAchievementKey[]);
};

const determinePlayerPossibleActions = ({
  age,
  ageAchievementData,
  cards,
  playerData,
  score,
}: {
  age: IAgeDataItem;
  ageAchievementData?: AgeAchievements;
  cards: Cards;
  playerData: PlayerGameDetailsFragment;
  score: number;
}): PossibleActions => {
  return {
    // NOTE: BE handles winner scenario. draw is always a valid possible action
    draw: true,
    meld: playerData.hand,
    dogma: determineCardsAvailableToDogma(playerData.board, cards),
    achieve: determineAvailableAgeAchievements(age, score, ageAchievementData),
  };
};

const formatPlayerMetadata = ({
  ageAchievementData,
  cards,
  playerData,
}: {
  ageAchievementData?: AgeAchievements;
  cards: Cards;
  playerData: PlayerGameDetailsFragment;
}): PlayerMetadata => {
  const age = calculatePlayerAge(recurseRemoveTypename(playerData.board), cards);
  const score = calculatePlayerScore(playerData.scorePile, cards);
  return {
    age,
    score,
    resourceTotals: calculateResourceTotals(recurseRemoveTypename(playerData.board), cards),
    possibleActions: determinePlayerPossibleActions({
      ageAchievementData,
      playerData,
      age,
      cards,
      score,
    }),
    numAchievements: playerData.ageAchievements.length,
    numSpecialAchievements: playerData.specialAchievements.length,
  };
};

const formatPlayer = ({
  ageAchievementData,
  cards,
  playerData,
}: {
  ageAchievementData?: AgeAchievements;
  cards: Cards;
  playerData: PlayerGameDetailsFragment;
}): Player & { hand: Hand; board: Board } => {
  return {
    playerId: playerData.playerRef,
    detailsRecordRef: playerData._id,
    username: playerData.username ?? 'Unnamed user',
    hand: playerData.hand,
    board: recurseRemoveTypename(playerData.board),
    metadata: formatPlayerMetadata({ ageAchievementData, playerData, cards }),
  };
};

export const formatPlayers = ({
  ageAchievementData,
  cards,
  playersGameData,
}: {
  ageAchievementData?: AgeAchievements;
  cards: Cards;
  playersGameData: PlayerGameDetailsFragment[];
}): Array<Player & { hand: Hand; board: Board }> => {
  return playersGameData.map((playerData) =>
    formatPlayer({ ageAchievementData, playerData, cards })
  );
};
