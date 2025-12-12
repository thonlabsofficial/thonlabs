import { z } from 'zod';
import { domain } from './custom-validators';
import { createMetadataSchema } from './metadata-validators';
import { Metadata } from '@/_interfaces/metadata';

export const newOrganizationFormSchema = ({
  metadataModels,
}: {
  metadataModels: Metadata[];
}) =>
  z.object({
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
    metadata: createMetadataSchema(metadataModels),
  });
export type NewOrganizationFormData = z.infer<
  ReturnType<typeof newOrganizationFormSchema>
>;

export const editOrganizationFormSchema = ({
  metadataModels,
}: {
  metadataModels: Metadata[];
}) =>
  z.object({
    name: z
      .string({ required_error: 'This field is required' })
      .min(1, { message: 'This field is required' }),
    domains: z
      .object({
        domain: domain(),
      })
      .array(),
    metadata: createMetadataSchema(metadataModels),
  });

export type EditOrganizationFormData = z.infer<
  ReturnType<typeof editOrganizationFormSchema>
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
