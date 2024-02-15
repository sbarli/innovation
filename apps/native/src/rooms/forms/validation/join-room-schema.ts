import { ZodType, z } from 'zod';

import { JoinRoomFormData } from '../../room.types';

export const joinRoomFormSchema: ZodType<JoinRoomFormData> = z.object({
  roomId: z
    .string()
    .refine(
      (value) => /^[a-zA-Z0-9]*$/gm.test(value),
      'Room ID may only contain letters and numbers. Check the ID and try again.'
    ),
});
