import { z } from 'zod';
import { ErrorMessages } from '@repo/utils/errors-metadata';
import { colorPatterns } from '@repo/utils/validation-patterns';
import { SSOSocialProvider } from '@thonlabs/nextjs';

export const UpdateEnvironmentAuthSettingsFormSchema = z.object({
  authProvider: z.string({ required_error: ErrorMessages.RequiredField }),
  tokenExpirationValue: z
    .number({
      required_error: ErrorMessages.RequiredField,
      invalid_type_error: ErrorMessages.InvalidNumber,
    })
    .min(1, { message: ErrorMessages.MinValue.replace('{min}', '1') }),
  tokenExpirationUnit: z.enum(['m', 'd'], {
    required_error: ErrorMessages.RequiredField,
  }),
  refreshTokenExpirationValue: z
    .number({
      required_error: ErrorMessages.RequiredField,
      invalid_type_error: ErrorMessages.InvalidNumber,
    })
    .min(1, { message: ErrorMessages.MinValue.replace('{min}', '1') }),
  
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
  activeSSOProviders: z.array(z.nativeEnum(SSOSocialProvider)),
});

export type UpdateEnvironmentAuthSettingsFormData = z.infer<
  typeof UpdateEnvironmentAuthSettingsFormSchema
>;

export const updateProviderCredentialsFormSchema = z.object({
  clientId: z
    .string({ required_error: ErrorMessages.RequiredField })
    .min(1, { message: ErrorMessages.RequiredField }),
  secretKey: z
    .string({ required_error: ErrorMessages.RequiredField })
    .min(1, { message: ErrorMessages.RequiredField }),
  redirectURI: z
    .string({ required_error: ErrorMessages.RequiredField })
    .url({ message: ErrorMessages.InvalidURL }),
});

export type UpdateProviderCredentialsFormData = z.infer<
  typeof updateProviderCredentialsFormSchema
>;
