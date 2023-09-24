import { CardRefsByAge } from 'src/cards/dto/card-refs-by-age.dto';
import { Achievements } from 'src/games/schemas/achievements.schema';
import { Deck } from 'src/games/schemas/deck.schema';
import { AgeString, ages } from 'src/shared/constants/cards';
import { shuffleArray } from 'src/shared/utils/shuffle-array';

export type TPlayerStarterHands = {
  [key: string]: string[];
};

const cloneDeck = (baseDeck: Deck): Deck => {
  return Object.keys(baseDeck).reduce((acc, age) => {
    acc[age as AgeString] = [...baseDeck[age as AgeString]];
    return acc;
  }, {} as Deck);
};

export const shuffleDeck = (cardRefsByAge: CardRefsByAge): Deck =>
  Object.keys(cardRefsByAge).reduce((acc, ageString) => {
    const age = ageString as AgeString;
    acc[age] = shuffleArray(cardRefsByAge[age]);
    return acc;
  }, {} as Deck);

export const pickAgeAchievements = (
  currentDeck: Deck,
): { ageAchievements: Achievements; deckMinusAchievements: Deck } => {
  const deckMinusAchievements = cloneDeck(currentDeck);
  const ageAchievements = ages.reduce((acc, age) => {
    if (age !== AgeString.TEN) {
      const cardId = deckMinusAchievements[age].shift();
      if (!cardId) {
        throw new Error('Missing cardId for age achievements draw');
      }
      acc[age] = cardId;
    }
    return acc;
  }, {} as Achievements);
  return { ageAchievements, deckMinusAchievements };
};

export const selectStarterHandsForPlayers = (
  currentDeck: Deck,
  playerRefs: string[],
): { playerStarterHands: TPlayerStarterHands; deckMinusStarterHands: Deck } => {
  const deckMinusStarterHands = cloneDeck(currentDeck);
  const playerStarterHands = playerRefs.reduce((acc, ref) => {
    acc[ref] = [];
    return acc;
  }, {} as TPlayerStarterHands);
  for (let i = 0; i < 2; i++) {
    Object.keys(playerStarterHands).forEach((playerId) => {
      const cardId = deckMinusStarterHands[AgeString.ONE].shift();
      if (!cardId) {
        throw new Error('Missing cardId for starter hands draw');
      }
      playerStarterHands[playerId].push(cardId);
    });
  }
  return { playerStarterHands, deckMinusStarterHands };
};
