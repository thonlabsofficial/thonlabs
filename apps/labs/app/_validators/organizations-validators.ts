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
  logo: z
    .any()
    .optional()
    .refine(
      (files) => {
        // Skip validation on server side
        if (typeof window === 'undefined') return true;
        // Validate on client side
        return !files || (files instanceof FileList && files.length <= 1);
      },
      { message: 'Please select a valid image file' },
    ),
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
  logo: z
    .any()
    .optional()
    .refine(
      (files) => {
        // Skip validation on server side
        if (typeof window === 'undefined') return true;
        // Validate on client side
        return !files || (files instanceof FileList && files.length <= 1);
      },
      { message: 'Please select a valid image file' },
    ),
});
export type UpdateLogoOrganizationFormData = z.infer<
  typeof updateLogoOrganizationFormSchema
>;
