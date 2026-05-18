import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const CardSchema = z.object({
  id: z.string().uuid(),
  cardId: z.string(),
  name: z.string(),
  age: z.number().int().min(1).max(10),
  color: z.string(),
  dogmaResource: z.string(),
  resourceTotals: z.record(z.number()),
  resourceSpaces: z.object({
    resourceSpace1: z.string().nullable(),
    resourceSpace2: z.string().nullable(),
    resourceSpace3: z.string().nullable(),
    resourceSpace4: z.string().nullable(),
  }),
  dogmaEffects: z.array(
    z.object({
      description: z.string(),
      effectTypes: z.array(z.string()),
      isDemand: z.boolean(),
      isOptional: z.boolean(),
      repeat: z.boolean(),
      specialAchievement: z.string().nullable(),
    }),
  ),
});

export const cardsContract = c.router({
  getCards: {
    method: 'GET',
    path: '/cards',
    responses: {
      200: z.array(CardSchema),
    },
    summary: 'Get all cards',
  },
  getCard: {
    method: 'GET',
    path: '/cards/:cardId',
    pathParams: z.object({ cardId: z.string() }),
    responses: {
      200: CardSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get a single card by cardId',
  },
});
