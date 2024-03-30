'use server';

import { labsAPI } from '@/helpers/api';
import { LoginFormData } from '../_validators/login-validators';
import { AxiosError } from 'axios';
import { cookies } from 'next/headers';

type ErrorResponse = {
  error?: string;
};

type LoginResponse = {
  token: string;
  tokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
} & ErrorResponse;

export async function login(payload: LoginFormData): Promise<LoginResponse> {
  try {
    const { data } = await labsAPI.post<LoginResponse>('/auth/login', payload);

    cookies().set('tl_session', data.token, {
      path: '/',
      expires: data.tokenExpiresIn,
    });
    cookies().set('tl_refresh', data.refreshToken, {
      path: '/',
      expires: data.refreshTokenExpiresIn,
      httpOnly: true,
    });

    return data;
  } catch (e) {
    return (e as AxiosError)?.response?.data as LoginResponse;
  }
}
