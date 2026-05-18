import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const RoomSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  hostId: z.string().uuid(),
  availableToJoin: z.boolean(),
  createdAt: z.string(),
});

const RoomWithMembersSchema = RoomSchema.extend({
  members: z.array(
    z.object({
      id: z.string().uuid(),
      username: z.string(),
    }),
  ),
});

export const roomsContract = c.router({
  createRoom: {
    method: 'POST',
    path: '/rooms',
    body: z.object({ name: z.string().min(1).max(64) }),
    responses: {
      201: RoomWithMembersSchema,
    },
    summary: 'Create a new room',
  },
  getRoomsForPlayer: {
    method: 'GET',
    path: '/rooms',
    responses: {
      200: z.array(RoomWithMembersSchema),
    },
    summary: 'List rooms the authenticated player is a member of',
  },
  getRoom: {
    method: 'GET',
    path: '/rooms/:roomId',
    pathParams: z.object({ roomId: z.string().uuid() }),
    responses: {
      200: RoomWithMembersSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get a single room by ID',
  },
  joinRoom: {
    method: 'POST',
    path: '/rooms/:roomId/join',
    pathParams: z.object({ roomId: z.string().uuid() }),
    body: z.object({}),
    responses: {
      200: RoomWithMembersSchema,
      400: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Join an existing room',
  },
  updateRoomAvailability: {
    method: 'PATCH',
    path: '/rooms/:roomId/availability',
    pathParams: z.object({ roomId: z.string().uuid() }),
    body: z.object({ availableToJoin: z.boolean() }),
    responses: {
      200: RoomSchema,
      403: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Update room availability (host only)',
  },
  closeRoom: {
    method: 'DELETE',
    path: '/rooms/:roomId',
    pathParams: z.object({ roomId: z.string().uuid() }),
    body: z.object({}),
    responses: {
      204: z.undefined(),
      403: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Close (delete) a room (host only)',
  },
});
