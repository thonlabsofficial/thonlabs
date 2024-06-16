import { passwordPatterns } from '@helpers/patterns/password-pattern';
import { z } from 'zod';

export const NewProjectFormSchema = z.object({
  appName: z
    .string({ required_error: 'This field is required' })
    .min(1, { message: 'Project name is required' }),
  appURL: z.string().url(),
});

export type NewProjectFormData = z.infer<typeof NewProjectFormSchema>;
