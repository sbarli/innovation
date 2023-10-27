import { MOCK_CARD_REFS_BY_AGE } from 'src/cards/__mocks__/cards-sorting.mock';
import { MOCK_DECK } from 'src/games/__mocks__/deck.mock';
import { Deck } from 'src/games/schemas/deck.schema';

import { AgeString } from '@inno/constants';

import { MOCK_PLAYER_REFS } from '../__mocks__/gameplay.mock';
import {
  cloneDeck,
  pickAgeAchievements,
  selectStarterHandsForPlayers,
  shuffleDeck,
} from '../helpers/new-game';

describe('cloneDeck', () => {
  it('should return a deep clone of the supplied deck', () => {
    const output = cloneDeck(MOCK_DECK);
    expect(output).toEqual(MOCK_DECK);
    expect(output).not.toBe(MOCK_DECK);
  });
});

describe('shuffleDeck', () => {
  it('should return deck with a new order for cards by age', () => {
    const output = shuffleDeck(MOCK_CARD_REFS_BY_AGE);
    // check that cards aren't shuffled into different age groups
    Object.entries(output).forEach(([age, cards]) => {
      const cardsAreCorrectAge = cards.every((c: string) => c.includes(age));
      expect(cardsAreCorrectAge).toBe(true);
    });
    expect(output).not.toEqual(MOCK_DECK);
  });
});

describe('pickAgeAchievements', () => {
  const { ageAchievements, deckMinusAchievements } = pickAgeAchievements(MOCK_DECK);

  it('should return one card per age sorted by age', () => {
    Object.entries(ageAchievements).forEach(([age, card]) => {
      const cardIsCorrectAge = MOCK_DECK[age as AgeString].includes(card);
      expect(cardIsCorrectAge).toBe(true);
    });
  });

  it('should return input deck minus selected achievement cards', () => {
    const flattenedDeckMinusAchievements = Object.values(deckMinusAchievements).flat();
    Object.values(ageAchievements).forEach((card) => {
      const cardWasRemovedFromDeck = !flattenedDeckMinusAchievements.includes(card);
      expect(cardWasRemovedFromDeck).toBe(true);
    });
  });

  it('should not remove any TEN age cards from deck', () => {
    expect(deckMinusAchievements.TEN).toEqual(MOCK_DECK.TEN);
  });

  it('should throw error if no achievement card available', () => {
    const output = () =>
      pickAgeAchievements({
        ONE: [] as string[],
      } as Deck);
    expect(output).toThrow('Missing cardId for age achievements draw');
  });
});

describe('selectStarterHandsForPlayers', () => {
  const { playerStarterHands, deckMinusStarterHands } = selectStarterHandsForPlayers(
    MOCK_DECK,
    MOCK_PLAYER_REFS
  );

  it('should select 2 cards per player', () => {
    Object.values(playerStarterHands).forEach((hand) => {
      expect(hand.length).toBe(2);
    });
  });

  it('should select ONE age cards only', () => {
    const flattenedPlayerStarterHands = Object.values(playerStarterHands).flat();
    flattenedPlayerStarterHands.forEach((card) => {
      expect(MOCK_DECK.ONE.includes(card)).toBe(true);
    });
  });

  it('should remove selected cards from deck', () => {
    const flattenedDeckMinusStarterHands = Object.values(deckMinusStarterHands).flat();
    const flattenedPlayerStarterHands = Object.values(playerStarterHands).flat();
    expect(deckMinusStarterHands).not.toEqual(MOCK_DECK);
    flattenedPlayerStarterHands.forEach((card) => {
      const cardWasRemovedFromDeck = !flattenedDeckMinusStarterHands.includes(card);
      expect(cardWasRemovedFromDeck).toBe(true);
    });
  });
});
