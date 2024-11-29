import { z } from 'zod';
import { domain } from './custom-validators';

export const newOrganizationFormSchema = z.object({
  name: z
    .string({ required_error: 'This field is required' })
    .min(1, { message: 'This field is required' }),
  domains: z
    .object({
      domain: domain(),
    })
    .array(),
  logo: z.instanceof(FileList).optional(),
});
export type NewOrganizationFormData = z.infer<typeof newOrganizationFormSchema>;
