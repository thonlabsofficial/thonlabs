import { z } from 'zod';

export const NewUserFormSchema = z.object({
  fullName: z
    .string({ required_error: 'This field is required' })
    .min(1, { message: 'This field is required' })
    .refine((value) => value.trim().split(' ').length >= 2, {
      message: 'Please, type the full name',
    }),
  email: z.string({ required_error: 'This field is required' }).email(),
  sendInvite: z.boolean().optional(),
});
export type NewUserFormData = z.infer<typeof NewUserFormSchema>;

export const UpdateUserFormSchema = z.object({
  fullName: z.string({ required_error: 'This field is required' }),
});
export type UpdateUserFormData = z.infer<typeof UpdateUserFormSchema>;
