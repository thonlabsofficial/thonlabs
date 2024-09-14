'use server';

import { labsPublicAPI } from '../../../helpers/api';
import { LoginFormData } from '../_validators/auth-validators';
import { AxiosError } from 'axios';
import ServerSessionService from '../../_libs/_nextjs/services/server-session-service';
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
