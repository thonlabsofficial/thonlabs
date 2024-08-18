import { z } from 'zod';

export const UpdateUserFormSchema = z.object({
  fullName: z.string({ required_error: 'This field is required' }),
});

export type UpdateUserFormData = z.infer<typeof UpdateUserFormSchema>;
