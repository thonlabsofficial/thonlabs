'use server';

import { labsPublicAPI } from '../../../helpers/api';
import { LoginFormData } from '../_validators/auth-validators';
import { AxiosError } from 'axios';
import ServerSessionService from '../_services/server-session-service';

type ErrorResponse = {
  statusCode?: number;
  error?: string;
  message?: string;
};

export type SessionData = {
  token: string;
  tokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
} & ErrorResponse;

export async function login(payload: LoginFormData): Promise<SessionData> {
  try {
    const { data } = await labsPublicAPI.post<SessionData>(
      '/auth/login',
      payload,
    );

    ServerSessionService.create(data);

    return data;
  } catch (e) {
    return (e as AxiosError)?.response?.data as SessionData;
  }
}
