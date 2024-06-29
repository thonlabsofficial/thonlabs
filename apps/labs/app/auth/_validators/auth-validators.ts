import { passwordPatterns } from '@repo/utils/validation-patterns';
import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginFormData = z.infer<typeof LoginFormSchema>;

export const ResetPasswordFormSchema = z.object({
  email: z.string().email(),
});

export type ResetPasswordFormData = z.infer<typeof ResetPasswordFormSchema>;

export const CreateNewPasswordFormSchema = z
  .object({
    password: z
      .string({ required_error: 'This field is required' })
      .regex(passwordPatterns.middleStrength, { message: 'Password is weak' }),
    confirm: z.string({ required_error: 'This field is required' }),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords must be equals',
    path: ['confirm'],
  });

export type CreateNewPasswordFormData = z.infer<
  typeof CreateNewPasswordFormSchema
>;
