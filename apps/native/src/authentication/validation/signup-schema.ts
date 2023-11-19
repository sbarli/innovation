import { ZodType, z } from 'zod';

import { SignupFormData } from '../auth.types';

export const signupFormSchema: ZodType<SignupFormData> = z
  .object({
    displayName: z
      .string()
      .min(3)
      .max(20)
      .refine(
        (value) => /^[\w.\-]+$/.test(value),
        "Display name may only contain letters, numbers, '.', and '-'"
      ),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .max(30)
      .refine((value) => /\d/.test(value), 'Password must contain at least one number'),
    passwordConfirm: z
      .string()
      .min(8)
      .max(30)
      .refine((value) => /\d/.test(value), 'Password must contain at least one number'),
  })
  .refine((data: SignupFormData) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  });
