import { Color, Resource } from '@inno/constants';

import { Card } from 'src/cards/schemas/card.schema';
import { SplayOption } from 'src/player-game-details/player-game-details.types';
import { Board } from 'src/player-game-details/schemas/board.schema';

export interface IWinnerByScoreProps {
  cards: Card[];
  scorePilesByPlayer: Record<string, string[]>;
}
export const determineWinnerByHighestScore = ({
  cards,
  scorePilesByPlayer,
}: IWinnerByScoreProps): string => {
  const DEFAULT = {
    playerId: '',
    score: -1,
  };
  const playerWithHighestScore = Object.keys(scorePilesByPlayer).reduce((acc, pid) => {
    const currentPlayerScore = scorePilesByPlayer[pid].reduce((score, cardId) => {
      const card = cards.find((c) => c._id === cardId);
      if (!card) {
        return score;
      }
      return score + card.age;
    }, 0);
    if (currentPlayerScore > acc.score) {
      return {
        playerId: pid,
        score: currentPlayerScore,
      };
    }
    return acc;
  }, DEFAULT);
  return playerWithHighestScore.playerId;
};

export const determineWinnerByLowestScore = ({
  cards,
  scorePilesByPlayer,
}: IWinnerByScoreProps): string => {
  const DEFAULT = {
    playerId: '',
    score: Infinity,
  };
  const playerWithLowestScore = Object.keys(scorePilesByPlayer).reduce((acc, pid) => {
    const currentPlayerScore = scorePilesByPlayer[pid].reduce((score, cardId) => {
      const card = cards.find((c) => c._id === cardId);
      if (!card) {
        return score;
      }
      return score + card.age;
    }, 0);
    if (currentPlayerScore < acc.score) {
      return {
        playerId: pid,
        score: currentPlayerScore,
      };
    }
    return acc;
  }, DEFAULT);
  return playerWithLowestScore.playerId;
};

export interface IWinnerByResourceProps {
  boardsByPlayer: Record<string, Board>;
  cards: Card[];
  resource: Resource;
}
export const determineWinnerByHighestResource = ({
  boardsByPlayer,
  cards,
  resource,
}: IWinnerByResourceProps): string => {
  const DEFAULT = {
    playerId: '',
    amount: -1,
  };
  const playerWithHighestResource = Object.keys(boardsByPlayer).reduce((acc, pid) => {
    let currentResourceCount = 0;
    const addToCount = (card: Card, resource: Resource, side?: SplayOption | null) => {
      switch (side) {
        // Resource space 4 = exposed resource when splayed LEFT
        case SplayOption.LEFT:
          if (card.resourceSpaces.resourceSpace4 === resource) {
            currentResourceCount += 1;
          }
          break;
        // Resource spaces 1 & 2 = exposed resource when splayed RIGHT
        case SplayOption.RIGHT:
          if (card.resourceSpaces.resourceSpace1 === resource) {
            currentResourceCount += 1;
          }
          if (card.resourceSpaces.resourceSpace2 === resource) {
            currentResourceCount += 1;
          }
          break;
        // Resource spaces 2, 3, & 4 = exposed resource when splayed UP
        case SplayOption.UP:
          if (card.resourceSpaces.resourceSpace2 === resource) {
            currentResourceCount += 1;
          }
          if (card.resourceSpaces.resourceSpace3 === resource) {
            currentResourceCount += 1;
          }
          if (card.resourceSpaces.resourceSpace4 === resource) {
            currentResourceCount += 1;
          }
          break;
        // NOT SPLAYED, ADD ALL RESOURCE TOTALS
        default:
          currentResourceCount += card.resourceTotals[resource];
      }
    };
    Object.values(Color).forEach((color) => {
      if (!boardsByPlayer[pid][color].cardRefs.length) {
        return;
      }
      const topCard = cards.find((c) => c._id === boardsByPlayer[pid][color].cardRefs[0]);
      if (!topCard) {
        return;
      }
      addToCount(topCard, resource);
      if (boardsByPlayer[pid][color].splayed) {
        const remainingCardsInPile = boardsByPlayer[pid][color].cardRefs
          .slice(1)
          .map((cardId) => cards.find((c) => c._id === cardId));
        remainingCardsInPile.forEach((card) =>
          card ? addToCount(card, resource, boardsByPlayer[pid][color].splayed) : null
        );
      }
    });
    if (currentResourceCount > acc.amount) {
      return {
        playerId: pid,
        amount: currentResourceCount,
      };
    }
    return acc;
  }, DEFAULT);
  return playerWithHighestResource.playerId;
};

export const determineWinnerByLowestResource = ({
  boardsByPlayer,
  cards,
  resource,
}: IWinnerByResourceProps): string => {
  const DEFAULT = {
    playerId: '',
    amount: Infinity,
  };
  const playerWithHighestResource = Object.keys(boardsByPlayer).reduce((acc, pid) => {
    let currentResourceCount = 0;
    const addToCount = (card: Card, resource: Resource, side?: SplayOption | null) => {
      switch (side) {
        // Resource space 4 = exposed resource when splayed LEFT
        case SplayOption.LEFT:
          if (card.resourceSpaces.resourceSpace4 === resource) {
            currentResourceCount += 1;
          }
          break;
        // Resource spaces 1 & 2 = exposed resource when splayed RIGHT
        case SplayOption.RIGHT:
          if (card.resourceSpaces.resourceSpace1 === resource) {
            currentResourceCount += 1;
          }
          if (card.resourceSpaces.resourceSpace2 === resource) {
            currentResourceCount += 1;
          }
          break;
        // Resource spaces 2, 3, & 4 = exposed resource when splayed UP
        case SplayOption.UP:
          if (card.resourceSpaces.resourceSpace2 === resource) {
            currentResourceCount += 1;
          }
          if (card.resourceSpaces.resourceSpace3 === resource) {
            currentResourceCount += 1;
          }
          if (card.resourceSpaces.resourceSpace4 === resource) {
            currentResourceCount += 1;
          }
          break;
        // NOT SPLAYED, ADD ALL RESOURCE TOTALS
        default:
          currentResourceCount += card.resourceTotals[resource];
      }
    };
    Object.values(Color).forEach((color) => {
      if (!boardsByPlayer[pid][color].cardRefs.length) {
        return;
      }
      const topCard = cards.find((c) => c._id === boardsByPlayer[pid][color].cardRefs[0]);
      if (!topCard) {
        return;
      }
      addToCount(topCard, resource);
      if (boardsByPlayer[pid][color].splayed) {
        const remainingCardsInPile = boardsByPlayer[pid][color].cardRefs
          .slice(1)
          .map((cardId) => cards.find((c) => c._id === cardId));
        remainingCardsInPile.forEach((card) =>
          card ? addToCount(card, resource, boardsByPlayer[pid][color].splayed) : null
        );
      }
    });
    console.log(`player ${pid} has resource count of ${currentResourceCount} for ${resource}`);
    if (currentResourceCount < acc.amount) {
      return {
        playerId: pid,
        amount: currentResourceCount,
      };
    }
    return acc;
  }, DEFAULT);
  return playerWithHighestResource.playerId;
};
