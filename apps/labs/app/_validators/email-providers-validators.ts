import { ErrorMessages } from '@repo/utils/errors-metadata';
import { z } from 'zod';

export const updateEmailProviderCredentialValidator = z.object({
  domain: z
    .string({ required_error: ErrorMessages.RequiredField })
    .regex(
      /^(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,})$/,
      { message: ErrorMessages.InvalidDomainFormat }
    )
    .min(1, { message: ErrorMessages.RequiredField })
    .max(255, { message: ErrorMessages.MaxLength }),
  secretKey: z
    .string({ required_error: ErrorMessages.RequiredField })
    .min(1, { message: ErrorMessages.RequiredField })
    .max(255, { message: ErrorMessages.MaxLength }),
  active: z.boolean(),
});

export type UpdateEmailProviderCredentialPayload = z.infer<
  typeof updateEmailProviderCredentialValidator
>;
