import { ZodType, z } from 'zod';

import { LoginFormData } from '../auth.types';

export const loginFormSchema: ZodType<LoginFormData> = z.object({
  email: z.string().email(),
  password: z.string(),
});
