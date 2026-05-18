import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  createdAt: z.string(),
});

export const usersContract = c.router({
  createProfile: {
    method: 'POST',
    path: '/users/profile',
    body: z.object({ username: z.string().min(2).max(32) }),
    responses: {
      201: UserSchema,
      409: z.object({ message: z.string() }),
    },
    summary: 'Create user profile after Supabase signup',
  },
  getMe: {
    method: 'GET',
    path: '/users/me',
    responses: {
      200: UserSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get the authenticated user profile',
  },
});
