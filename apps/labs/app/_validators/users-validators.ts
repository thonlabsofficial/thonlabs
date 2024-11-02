import { z } from 'zod';

export const NewUserFormSchema = z.object({
  fullName: z
    .string({ required_error: 'This field is required' })
    .min(1, { message: 'This field is required' })
    .refine((value) => value.trim().split(' ').length >= 2, {
      message: 'Please enter the full name',
    }),
  email: z.string({ required_error: 'This field is required' }).email(),
  sendInvite: z.boolean().optional(),
});
export type NewUserFormData = z.infer<typeof NewUserFormSchema>;

export const UpdateUserGeneralDataFormSchema = z.object({
  fullName: z
    .string({ required_error: 'This field is required' })
    .min(1, { message: 'This field is required' })
    .refine((value) => value.trim().split(' ').length >= 2, {
      message: 'Please enter the full name',
    }),
});
export type UpdateUserGeneralDataFormData = z.infer<
  typeof UpdateUserGeneralDataFormSchema
>;

export const UpdateUserStatusFormSchema = z.object({
  active: z.boolean(),
});
export type UpdateUserStatusFormData = z.infer<
  typeof UpdateUserStatusFormSchema
>;
