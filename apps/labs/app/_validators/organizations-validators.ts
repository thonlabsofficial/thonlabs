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

export const editOrganizationFormSchema = z.object({
  name: z
    .string({ required_error: 'This field is required' })
    .min(1, { message: 'This field is required' }),
  domains: z
    .object({
      domain: domain(),
    })
    .array(),
});

export type EditOrganizationFormData = z.infer<
  typeof editOrganizationFormSchema
>;

export const updateLogoOrganizationFormSchema = z.object({
  logo: z.instanceof(FileList).optional(),
});
export type UpdateLogoOrganizationFormData = z.infer<
  typeof updateLogoOrganizationFormSchema
>;
