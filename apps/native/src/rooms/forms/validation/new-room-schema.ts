import { ZodType, z } from 'zod';

import { NewRoomFormData } from '../../room.types';

export const newRoomFormSchema: ZodType<NewRoomFormData> = z.object({
  roomId: z
    .string()
    .min(5, 'Room name must be at least 5 characters long')
    .max(100, 'Room name may not be more than 100 characters long')
    .refine(
      (value) => /^[\w_\-]+$/.test(value),
      "Room name may only contain letters, numbers, '_', and/or '-'"
    ),
});
