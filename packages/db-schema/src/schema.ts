import {
  boolean,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  username: text('username').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const rooms = pgTable('rooms', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  hostId: uuid('host_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  availableToJoin: boolean('available_to_join').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const roomMembers = pgTable(
  'room_members',
  {
    roomId: uuid('room_id')
      .notNull()
      .references(() => rooms.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (t) => [primaryKey({ columns: [t.roomId, t.userId] })],
);

export const games = pgTable('games', {
  id: uuid('id').primaryKey().defaultRandom(),
  roomId: uuid('room_id')
    .notNull()
    .unique()
    .references(() => rooms.id, { onDelete: 'cascade' }),
  stage: text('stage').notNull().default('setup'),
  currentPlayerId: uuid('current_player_id')
    .notNull()
    .references(() => users.id),
  currentActionNumber: integer('current_action_number').notNull().default(1),
  winnerId: uuid('winner_id').references(() => users.id),
  deck: jsonb('deck').notNull().default({}),
  ageAchievements: jsonb('age_achievements').notNull().default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const playerGameDetails = pgTable(
  'player_game_details',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    gameId: uuid('game_id')
      .notNull()
      .references(() => games.id, { onDelete: 'cascade' }),
    playerId: uuid('player_id')
      .notNull()
      .references(() => users.id),
    board: jsonb('board').notNull().default({}),
    hand: text('hand').array().notNull().default([]),
    scorePile: text('score_pile').array().notNull().default([]),
    ageAchievements: text('age_achievements').array().notNull().default([]),
    specialAchievements: text('special_achievements').array().notNull().default([]),
  },
  (t) => [unique().on(t.gameId, t.playerId)],
);

export const cards = pgTable('cards', {
  id: uuid('id').primaryKey().defaultRandom(),
  cardId: text('card_id').notNull().unique(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  color: text('color').notNull(),
  dogmaResource: text('dogma_resource').notNull(),
  resourceTotals: jsonb('resource_totals').notNull().default({}),
  resourceSpaces: jsonb('resource_spaces').notNull().default({}),
  dogmaEffects: jsonb('dogma_effects').notNull().default([]),
});
