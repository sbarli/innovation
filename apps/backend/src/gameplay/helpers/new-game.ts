import { Age, AgeData } from '@inno/constants';
import { shuffleArray } from '@inno/utils';

import { CardRefsByAge } from 'src/cards/dto/card-refs-by-age.dto';
import { AgeAchievements } from 'src/games/schemas/age-achievements.schema';
import { Deck } from 'src/games/schemas/deck.schema';

export type TPlayerStarterHands = {
  [key: string]: string[];
};

export const cloneDeck = (baseDeck: Deck): Deck => {
  return Object.keys(baseDeck).reduce((acc, age: unknown) => {
    acc[age as Age] = [...baseDeck[age as Age]];
    return acc;
  }, {} as Deck);
};

export const shuffleDeck = (cardRefsByAge: CardRefsByAge): Deck =>
  Object.keys(cardRefsByAge).reduce((acc, age: unknown) => {
    acc[age as Age] = shuffleArray(cardRefsByAge[age as Age]) as string[];
    return acc;
  }, {} as Deck);

export const pickAgeAchievements = (
  currentDeck: Deck
): { ageAchievements: AgeAchievements; deckMinusAchievements: Deck } => {
  const deckMinusAchievements = cloneDeck(currentDeck);
  const ageAchievements = AgeData.reduce((acc, ageItem) => {
    if (ageItem.str !== Age.TEN) {
      const cardId = deckMinusAchievements[ageItem.str].shift();
      if (!cardId) {
        throw new Error('Missing cardId for age achievements draw');
      }
      acc[ageItem.str] = cardId;
    }
    return acc;
  }, {} as AgeAchievements);
  return { ageAchievements, deckMinusAchievements };
};

export const selectStarterHandsForPlayers = (
  currentDeck: Deck,
  playerRefs: string[]
): { playerStarterHands: TPlayerStarterHands; deckMinusStarterHands: Deck } => {
  const deckMinusStarterHands = cloneDeck(currentDeck);
  const playerStarterHands = playerRefs.reduce((acc, ref) => {
    acc[ref] = [];
    return acc;
  }, {} as TPlayerStarterHands);
  for (let i = 0; i < 2; i++) {
    Object.keys(playerStarterHands).forEach((playerId) => {
      const cardId = deckMinusStarterHands[Age.ONE].shift();
      if (!cardId) {
        throw new Error('Missing cardId for starter hands draw');
      }
      playerStarterHands[playerId].push(cardId);
    });
  }
  return { playerStarterHands, deckMinusStarterHands };
};
