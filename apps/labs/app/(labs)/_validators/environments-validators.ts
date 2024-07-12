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
