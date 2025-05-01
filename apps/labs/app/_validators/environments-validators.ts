import { z } from 'zod';
import { ErrorMessages } from '@repo/utils/errors-metadata';
import { colorPatterns } from '@repo/utils/validation-patterns';

export const NewEnvironmentFormSchema = z.object({
  name: z
    .string({ required_error: ErrorMessages.RequiredField })
    .min(1, { message: ErrorMessages.RequiredField })
    .max(25, { message: 'Environment name must be 25 characters or fewer' }),
  appURL: z.string().url(),
});

export type NewEnvironmentFormData = z.infer<typeof NewEnvironmentFormSchema>;

export const UpdateEnvironmentGeneralSettingsFormSchema = z.object({
  name: z
    .string({ required_error: ErrorMessages.RequiredField })
    .min(1, { message: ErrorMessages.RequiredField })
    .max(25, { message: 'This field must be 25 characters or fewer' }),
  appURL: z.string().url(),
  logo: z.instanceof(FileList).optional(),
});

export type UpdateEnvironmentGeneralSettingsFormData = z.infer<
  typeof UpdateEnvironmentGeneralSettingsFormSchema
>;

export const UpdateEnvironmentAuthSettingsFormSchema = z.object({
  authProvider: z.string({
    required_error: ErrorMessages.RequiredField
  }),
  tokenExpirationValue: z
    .number({
      required_error: ErrorMessages.RequiredField,
      invalid_type_error: ErrorMessages.InvalidNumber,
    })
    .min(1, { message: ErrorMessages.MinValue.replace('{min}', '1') })
    .max(54, { message: ErrorMessages.MaxValue.replace('{max}', '54') }),
  tokenExpirationUnit: z.enum(['m', 'd'], {
    required_error: ErrorMessages.RequiredField,
  }),

  refreshTokenExpirationValue: z
    .number({
      required_error: ErrorMessages.RequiredField,
      invalid_type_error: ErrorMessages.InvalidNumber,
    })
    .min(1, { message: ErrorMessages.MinValue.replace('{min}', '1') })
    .max(54, { message: ErrorMessages.MaxValue.replace('{max}', '54') }),
  
  refreshTokenExpirationUnit: z.enum(['m', 'd'], {
    required_error:ErrorMessages.RequiredField,
  }),
  
    enableSignUp: z.boolean(),
  enableSignUpB2BOnly: z.boolean(),
  styles: z.object({
    primaryColor: z
      .string({ required_error: ErrorMessages.RequiredField })
      .refine(
        (color) =>
          colorPatterns.hexColor.test(color) ||
          colorPatterns.rgbColor.test(color),
        { message: ErrorMessages.InvalidColorFormat },
      ),
  }),
});

export type UpdateEnvironmentAuthSettingsFormData = z.infer<
  typeof UpdateEnvironmentAuthSettingsFormSchema
>;

export const DeleteEnvironmentFormSchema = z.object({
  name: z
    .string({ required_error: ErrorMessages.RequiredField })
    .min(1, { message: ErrorMessages.RequiredField }),
});

export type DeleteEnvironmentFormData = z.infer<
  typeof DeleteEnvironmentFormSchema
>;

export const SetCustomDomainFormSchema = z.object({
  customDomain: z
    .string({ required_error: ErrorMessages.RequiredField })
    .regex(
      /^(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,})$/,
      { message: ErrorMessages.InvalidDomainFormat },
    )
    .min(1, { message: ErrorMessages.RequiredField }),
});
export type SetCustomDomainFormData = z.infer<typeof SetCustomDomainFormSchema>;
