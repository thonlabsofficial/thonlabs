export enum APIResponseCodes {
  GenericError = 0,
  Success = 20000,
  Logout = 20001,
  EmailConfirmation = 20002,
  EmailConfirmationWithoutSession = 20003,
  InviteAccepted = 20004,
  Unauthorized = 40001,
  SessionExpired = 40002,
  InvalidMagicToken = 40003,
  EmailConfirmationError = 40004,
  EmailConfirmationResent = 40005,
}

export interface ErrorResponse {
  statusCode?: number;
  error?: string;
  message?: string;
}

export const apiResponseMessages = {
  [APIResponseCodes.GenericError]: 'Internal server error',
  [APIResponseCodes.Success]: 'Request executed with success',
  [APIResponseCodes.Logout]: 'You have been logged out',
  [APIResponseCodes.Unauthorized]: 'Unauthorized access',
  [APIResponseCodes.SessionExpired]: 'Your session has expired',
  [APIResponseCodes.InvalidMagicToken]: 'Invalid magic link',
  [APIResponseCodes.EmailConfirmationError]:
    'The email confirmation link is invalid or has expired',
  [APIResponseCodes.EmailConfirmation]: 'Your email has been confirmed',
  [APIResponseCodes.EmailConfirmationWithoutSession]:
    'Your email has been confirmed. Please log in to continue.',
  [APIResponseCodes.EmailConfirmationResent]:
    'The email confirmation link is expired. We resent you another email.',
  [APIResponseCodes.InviteAccepted]: 'Invite accepted, welcome!',
};
