import { ZodType, z } from 'zod';

import { CreateRoomFormData } from '../../room.types';

export const createRoomFormSchema: ZodType<CreateRoomFormData> = z.object({
  roomName: z
    .string()
    .min(5, 'Room name must be at least 5 characters long')
    .max(100, 'Room name may not be more than 100 characters long')
    .refine(
      (value) => /^[\w_\-]+$/.test(value),
      "Room name may only contain letters, numbers, '_', and/or '-'"
    ),
});
