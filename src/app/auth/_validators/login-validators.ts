import { passwordPatterns } from '@/helpers/patterns/password-pattern';
import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(passwordPatterns.middleStrength, { message: 'Invalid password' }),
});

export type LoginFormData = z.infer<typeof LoginFormSchema>;
