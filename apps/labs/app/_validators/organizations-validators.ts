import { z } from 'zod';
import { domain } from './custom-validators';

export const newOrganizationFormSchema = z.object({
  name: z
    .string({ required_error: 'This field is required' })
    .min(1, { message: 'This field is required' })
    .refine((value) => value.trim().split(' ').length >= 2, {
      message: 'Please enter the full name',
    }),
  domains: z
    .object({
      domain: domain(),
    })
    .array(),
  logo: z.instanceof(File).optional(),
});
export type NewOrganizationFormData = z.infer<typeof newOrganizationFormSchema>;
