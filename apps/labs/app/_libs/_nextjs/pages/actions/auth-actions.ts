'use server';

import { labsPublicAPI } from '../../../../../helpers/api';
import { LoginFormData, SignUpFormData } from '../validators/auth-validators';
import { AxiosError } from 'axios';
import ServerSessionService from '../../services/server-session-service';
import { SessionData, ErrorResponse } from '@/_libs/_nextjs';

type DataReturn = SessionData & ErrorResponse;

export async function login(payload: LoginFormData): Promise<DataReturn> {
  try {
    const { data } = await labsPublicAPI.post<SessionData>(
      '/auth/login',
      payload,
    );

    if (data) {
      ServerSessionService.create(data);
    }

    return data;
  } catch (e: any) {
    console.log('Error on authActions.login:', {
      error: e.message,
    });
    return (e as AxiosError)?.response?.data as DataReturn;
  }
}

export async function signUp(payload: SignUpFormData): Promise<DataReturn> {
  try {
    const { data } = await labsPublicAPI.post<SessionData>(
      '/auth/signup',
      payload,
    );

    if (data) {
      ServerSessionService.create(data);
    }

    return data;
  } catch (e: any) {
    console.log('Error on authActions.signUp:', {
      error: e.message,
    });
    return (e as AxiosError)?.response?.data as DataReturn;
  }
}
