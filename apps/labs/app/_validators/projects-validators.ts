import { z } from 'zod';

export const NewProjectFormSchema = z.object({
  appName: z
    .string({ required_error: 'This field is required' })
    .min(1, { message: 'Project name is required' })
    .max(25, { message: 'Project name must be 25 characters or fewer' }),
  appURL: z.string().url(),
});

export type NewProjectFormData = z.infer<typeof NewProjectFormSchema>;

export const UpdateProjectGeneralInfoFormSchema = z.object({
  appName: z
    .string({ required_error: 'This field is required' })
    .min(1, { message: 'Project name is required' })
    .max(25, { message: 'Project name must be 25 characters or fewer' }),
});

export type UpdateProjectGeneralInfoFormData = z.infer<
  typeof UpdateProjectGeneralInfoFormSchema
>;

export const DeleteProjectFormSchema = z.object({
  appName: z
    .string({ required_error: 'This field is required' })
    .min(1, { message: 'Project name is required' }),
});

export type DeleteProjectFormData = z.infer<typeof DeleteProjectFormSchema>;
