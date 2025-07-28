import { ErrorMessages } from '@repo/utils/errors-metadata';
import { z } from 'zod';

export const domain = () =>
  z
    .string({ required_error: ErrorMessages.RequiredField })
    .regex(
      /^(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,})$/,
      { message: ErrorMessages.InvalidDomainFormat }
    )
    .min(1, { message: ErrorMessages.RequiredField });
