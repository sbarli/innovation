import { shuffleArray } from './shuffle-array';

type Deck = Record<string, string[]>;

export const buildShuffledDeck = (cardsByAge: Record<number, string[]>): Deck => {
  const deck: Deck = {};
  for (const [age, cardIds] of Object.entries(cardsByAge)) {
    deck[age] = shuffleArray(cardIds);
  }
  return deck;
};

export const getTopCardOfAge = (deck: Deck, age: number): string | null => {
  const pile = deck[String(age)];
  return pile && pile.length > 0 ? pile[0] : null;
};

export const removeTopCardOfAge = (deck: Deck, age: number): { deck: Deck; cardId: string | null } => {
  const pile = deck[String(age)];
  if (!pile || pile.length === 0) return { deck, cardId: null };
  const [cardId, ...remaining] = pile;
  return { deck: { ...deck, [String(age)]: remaining }, cardId };
};
