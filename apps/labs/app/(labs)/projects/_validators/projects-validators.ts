import { z } from 'zod';

export const NewProjectFormSchema = z.object({
  appName: z
    .string({ required_error: 'This field is required' })
    .min(1, { message: 'Project name is required' })
    .max(25, { message: 'Project name must be 25 characters or fewer' }),
  appURL: z.string().url(),
});

export type NewProjectFormData = z.infer<typeof NewProjectFormSchema>;

export const NewEnvironmentFormSchema = z.object({
  name: z
    .string({ required_error: 'This field is required' })
    .min(1, { message: 'Environment name is required' })
    .max(25, { message: 'Environment name must be 25 characters or fewer' }),
  appURL: z.string().url(),
});

export type NewEnvironmentFormData = z.infer<typeof NewEnvironmentFormSchema>;
