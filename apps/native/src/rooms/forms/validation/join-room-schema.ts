import { ZodType, z } from 'zod';

import { JoinRoomFormData } from '../../room.types';

export const joinRoomFormSchema: ZodType<JoinRoomFormData> = z.object({
  roomId: z.string(),
});
