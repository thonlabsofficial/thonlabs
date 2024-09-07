export enum APIResponseCodes {
  GenericError = 0,
  Success = 20000,
  Unauthorized = 40001,
  SessionExpired = 40002,
}

export interface ErrorResponse {
  statusCode?: number;
  error?: string;
  message?: string;
}

export const apiResponseMessages = {
  [APIResponseCodes.GenericError]: 'Internal server error',
  [APIResponseCodes.Success]: 'Request executed with success',
  [APIResponseCodes.Unauthorized]: 'Unauthorized access',
  [APIResponseCodes.SessionExpired]: 'Your session has expired',
};
