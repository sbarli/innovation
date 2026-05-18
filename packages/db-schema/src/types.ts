import type { DogmaEffect, SplayDirection } from '@inno/constants';
import type { cards, games, playerGameDetails, roomMembers, rooms, users } from './schema';

// Row types inferred from Drizzle schema
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Room = typeof rooms.$inferSelect;
export type NewRoom = typeof rooms.$inferInsert;

export type RoomMember = typeof roomMembers.$inferSelect;
export type NewRoomMember = typeof roomMembers.$inferInsert;

export type Game = typeof games.$inferSelect;
export type NewGame = typeof games.$inferInsert;

export type PlayerGameDetails = typeof playerGameDetails.$inferSelect;
export type NewPlayerGameDetails = typeof playerGameDetails.$inferInsert;

export type Card = typeof cards.$inferSelect;
export type NewCard = typeof cards.$inferInsert;

// Typed JSONB column shapes

export type CardResourceSpaces = {
  resourceSpace1: string | null;
  resourceSpace2: string | null;
  resourceSpace3: string | null;
  resourceSpace4: string | null;
};

export type CardResourceTotals = {
  castles: number;
  crowns: number;
  leaves: number;
  lightbulbs: number;
  factories: number;
  timepieces: number;
};

export type ColorPile = {
  cards: string[];
  splay: SplayDirection | null;
};

export type Board = Record<'blue' | 'green' | 'purple' | 'red' | 'yellow', ColorPile>;

export type Deck = Record<string, string[]>;

export type AgeAchievements = Record<string, string | null>;

// Card row with typed JSONB fields
export type TypedCard = Omit<Card, 'resourceTotals' | 'resourceSpaces' | 'dogmaEffects'> & {
  resourceTotals: CardResourceTotals;
  resourceSpaces: CardResourceSpaces;
  dogmaEffects: DogmaEffect[];
};

// Game row with typed JSONB fields
export type TypedGame = Omit<Game, 'deck' | 'ageAchievements'> & {
  deck: Deck;
  ageAchievements: AgeAchievements;
};

// PlayerGameDetails row with typed JSONB fields
export type TypedPlayerGameDetails = Omit<PlayerGameDetails, 'board'> & {
  board: Board;
};
