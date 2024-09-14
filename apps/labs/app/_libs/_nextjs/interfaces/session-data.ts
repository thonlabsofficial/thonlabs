export type SessionData = {
  token: string;
  tokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
  emailSent?: boolean;
};
