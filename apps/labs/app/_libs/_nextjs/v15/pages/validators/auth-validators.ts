import { passwordPatterns } from '../../../shared/utils/constants';
import { z } from 'zod';

export const LoginFormSchema = (isMagicLogin: boolean) =>
  z.object({
    email: z.string().email(),
    ...(isMagicLogin ? {} : { password: z.string() }),
  });
export type LoginFormData = z.infer<ReturnType<typeof LoginFormSchema>>;

export const SignUpFormSchema = (isMagicLogin: boolean) =>
  z.object({
    fullName: z.string().min(1, { message: 'This field is required' }),
    email: z.string().email(),
    ...(isMagicLogin
      ? {}
      : {
          password: z.string().regex(passwordPatterns.middleStrength, {
            message:
              'Password must have at least 8 characters, one uppercase letter, one special character and one digit.',
          }),
        }),
  });
export type SignUpFormData = z.infer<ReturnType<typeof SignUpFormSchema>>;

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
