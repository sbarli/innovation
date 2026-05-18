import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const ColorPileSchema = z.object({
  cards: z.array(z.string()),
  splay: z.enum(['left', 'right', 'up']).nullable(),
});

const BoardSchema = z.object({
  blue: ColorPileSchema,
  green: ColorPileSchema,
  purple: ColorPileSchema,
  red: ColorPileSchema,
  yellow: ColorPileSchema,
});

const PlayerDetailsSchema = z.object({
  id: z.string().uuid(),
  gameId: z.string().uuid(),
  playerId: z.string().uuid(),
  board: BoardSchema,
  hand: z.array(z.string()),
  scorePile: z.array(z.string()),
  ageAchievements: z.array(z.string()),
  specialAchievements: z.array(z.string()),
});

const GameSchema = z.object({
  id: z.string().uuid(),
  roomId: z.string().uuid(),
  stage: z.string(),
  currentPlayerId: z.string().uuid(),
  currentActionNumber: z.number().int(),
  winnerId: z.string().uuid().nullable(),
  deck: z.record(z.array(z.string())),
  ageAchievements: z.record(z.string().nullable()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const GameStateSchema = z.object({
  game: GameSchema,
  playerDetails: z.array(PlayerDetailsSchema),
});

export const gameplayContract = c.router({
  newGame: {
    method: 'POST',
    path: '/rooms/:roomId/games',
    pathParams: z.object({ roomId: z.string().uuid() }),
    body: z.object({}),
    responses: {
      201: GameStateSchema,
      400: z.object({ message: z.string() }),
      403: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Start a new game in a room (host only)',
  },
  getGame: {
    method: 'GET',
    path: '/games/:gameId',
    pathParams: z.object({ gameId: z.string().uuid() }),
    responses: {
      200: GameStateSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get current game state',
  },
  draw: {
    method: 'POST',
    path: '/games/:gameId/draw',
    pathParams: z.object({ gameId: z.string().uuid() }),
    body: z.object({}),
    responses: {
      200: GameStateSchema,
      400: z.object({ message: z.string() }),
      403: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Draw a card (draw highest board age, or age 1 if board empty)',
  },
  meld: {
    method: 'POST',
    path: '/games/:gameId/meld',
    pathParams: z.object({ gameId: z.string().uuid() }),
    body: z.object({ cardId: z.string() }),
    responses: {
      200: GameStateSchema,
      400: z.object({ message: z.string() }),
      403: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Meld a card from hand onto the board',
  },
  achieve: {
    method: 'POST',
    path: '/games/:gameId/achieve',
    pathParams: z.object({ gameId: z.string().uuid() }),
    body: z.object({ achievementAge: z.number().int().min(1).max(9) }),
    responses: {
      200: GameStateSchema,
      400: z.object({ message: z.string() }),
      403: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Claim an age achievement',
  },
});
