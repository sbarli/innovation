import { ZodType, z } from 'zod';

import { SignupFormData } from '../auth.types';

const passwordValidation = z
  .string()
  .min(8)
  .max(30)
  .refine((value) => /\d/.test(value), 'Password must contain at least one number');

export const signupFormSchema: ZodType<SignupFormData> = z
  .object({
    username: z
      .string()
      .min(3)
      .max(20)
      .refine(
        (value) => /^[\w.\-]+$/.test(value),
        "Display name may only contain letters, numbers, '.', and '-'"
      ),
    email: z.string().email(),
    password: passwordValidation,
    passwordConfirm: passwordValidation,
  })
  .refine((data: SignupFormData) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  });
