'use server';

import { labsPublicAPI } from '../../../../../../helpers/api';
import {
  CreateNewPasswordFormData,
  LoginFormData,
  SignUpFormData,
} from '../../../current/pages/validators/auth-validators';
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

export async function createNewPassword(
  token: string,
  payload: CreateNewPasswordFormData,
): Promise<DataReturn> {
  try {
    const { data } = await labsPublicAPI.patch<SessionData>(
      `/auth/reset-password/${token}`,
      payload,
    );

    return data;
  } catch (e: any) {
    console.log('Error on authActions.createNewPassword:', {
      error: e.message,
    });
    throw e;
  }
}
