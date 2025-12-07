import { EnvironmentAppData } from '@/_interfaces/environment-app-data';
import { Metadata } from '@/_interfaces/metadata';
import { z } from 'zod';
import { createMetadataSchema } from '@/_validators/metadata-validators';

export const NewUserFormSchema = ({
  envData,
  domains,
  metadataModels = [],
}: {
  envData: EnvironmentAppData;
  domains: { domain: string }[];
  metadataModels?: Metadata[];
}) =>
  z.object({
    fullName: z
      .string({ required_error: 'This field is required' })
      .min(1, { message: 'This field is required' })
      .refine((value) => value.trim().split(' ').length >= 2, {
        message: 'Please enter the full name',
      }),
    email: z
      .string({ required_error: 'This field is required' })
      .email()
      .refine(
        (email) => {
          if (!envData?.enableSignUpB2BOnly) {
            return true;
          }

          const emailDomain = email.split('@')[1];
          return domains.some(({ domain }) => domain === emailDomain);
        },
        { message: 'Email domain not matches any organization' },
      ),
    sendInvite: z.boolean().optional(),
    organizationId: z.string().optional(),
    metadata: createMetadataSchema(metadataModels),
  });
export type NewUserFormData = z.infer<ReturnType<typeof NewUserFormSchema>>;

export const UpdateUserGeneralDataFormSchema = (
  metadataModels: Metadata[] = [],
) =>
  z.object({
    fullName: z
      .string({ required_error: 'This field is required' })
      .min(1, { message: 'This field is required' })
      .refine((value) => value.trim().split(' ').length >= 2, {
        message: 'Please enter the full name',
      }),
    organizationId: z.string().optional(),
    metadata: createMetadataSchema(metadataModels),
  });
export type UpdateUserGeneralDataFormData = z.infer<
  ReturnType<typeof UpdateUserGeneralDataFormSchema>
>;

export const UpdateUserStatusFormSchema = z.object({
  active: z.boolean(),
});
export type UpdateUserStatusFormData = z.infer<
  typeof UpdateUserStatusFormSchema
>;
