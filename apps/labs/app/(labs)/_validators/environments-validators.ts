import { z } from 'zod';

export const NewEnvironmentFormSchema = z.object({
  name: z
    .string({ required_error: 'This field is required' })
    .min(1, { message: 'Environment name is required' })
    .max(25, { message: 'Environment name must be 25 characters or fewer' }),
  appURL: z.string().url(),
});

export type NewEnvironmentFormData = z.infer<typeof NewEnvironmentFormSchema>;

export const UpdateEnvironmentGeneralSettingsFormSchema = z.object({
  name: z
    .string({ required_error: 'This field is required' })
    .min(1, { message: 'Environment name is required' })
    .max(25, { message: 'Environment name must be 25 characters or fewer' }),
  appURL: z.string().url(),
});

export type UpdateEnvironmentGeneralSettingsFormData = z.infer<
  typeof UpdateEnvironmentGeneralSettingsFormSchema
>;

export const UpdateEnvironmentAuthSettingsFormSchema = z.object({
  authProvider: z.string({ required_error: 'This field is required' }),
  tokenExpiration: z.string({ required_error: 'This field is required' }),
  refreshTokenExpiration: z.string({
    required_error: 'This field is required',
  }),
});

export type UpdateEnvironmentAuthSettingsFormData = z.infer<
  typeof UpdateEnvironmentAuthSettingsFormSchema
>;

export const DeleteEnvironmentFormSchema = z.object({
  name: z
    .string({ required_error: 'This field is required' })
    .min(1, { message: 'Environment name is required' }),
});

export type DeleteEnvironmentFormData = z.infer<
  typeof DeleteEnvironmentFormSchema
>;
