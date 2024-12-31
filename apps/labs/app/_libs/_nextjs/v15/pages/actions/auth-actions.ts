'use server';

import Log from '../../../shared/utils/log';
import { labsPublicAPI } from '../../../shared/utils/api';
import { ErrorResponse } from '../../../shared/utils/errors';
import { SessionData } from '../../interfaces/session-data';
import {
  CreateNewPasswordFormData,
  LoginFormData,
  ResetPasswordFormData,
  SignUpFormData,
} from '../validators/auth-validators';
import { cookies } from 'next/headers';

type DataReturn = SessionData & ErrorResponse;

export async function login(
  payload: LoginFormData,
): Promise<DataReturn | null> {
  try {
    const response = await labsPublicAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    const data: SessionData = await response.json();

    if (data) {
      const { set } = await cookies();

      const expires = new Date(data.tokenExpiresIn);
      set('tl_session', data.token, {
        path: '/',
        expires,
        secure: process.env.NODE_ENV === 'production',
      });

      if (data.refreshToken) {
        set('tl_refresh', data.refreshToken, {
          path: '/',
          expires: data.refreshTokenExpiresIn,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        });
        set('tl_keep_alive', 'true', {
          path: '/',
          expires: data.refreshTokenExpiresIn,
          secure: process.env.NODE_ENV === 'production',
        });
      }
    }

    return data;
  } catch (e: any) {
    Log.error({
      action: 'login',
      statusCode: e.status,
      message: e.message || e.statusText,
    });
    return null;
  }
}

export async function signUp(
  payload: SignUpFormData,
): Promise<DataReturn | null> {
  try {
    const response = await labsPublicAPI('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to sign up');
    }

    const data: SessionData = await response.json();

    if (data) {
      const { set } = await cookies();

      const expires = new Date(data.tokenExpiresIn);
      set('tl_session', data.token, {
        path: '/',
        expires,
        secure: process.env.NODE_ENV === 'production',
      });

      if (data.refreshToken) {
        set('tl_refresh', data.refreshToken, {
          path: '/',
          expires: data.refreshTokenExpiresIn,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        });
        set('tl_keep_alive', 'true', {
          path: '/',
          expires: data.refreshTokenExpiresIn,
          secure: process.env.NODE_ENV === 'production',
        });
      }
    }

    return data;
  } catch (e: any) {
    Log.error({
      action: 'signUp',
      statusCode: e.status,
      message: e.message || e.statusText,
    });
    return null;
  }
}

export async function createNewPassword(
  token: string,
  payload: CreateNewPasswordFormData,
) {
  try {
    const response = await labsPublicAPI(`/auth/reset-password/${token}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to create new password');
    }
  } catch (e: any) {
    Log.error({
      action: 'createNewPassword',
      statusCode: e.status,
      message: e.message || e.statusText,
    });
    return null;
  }
}

export async function resetPassword(payload: ResetPasswordFormData) {
  try {
    const response = await labsPublicAPI('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to send reset password email');
    }
  } catch (e: any) {
    Log.error({
      action: 'resetPassword',
      statusCode: e.status,
      message: e.message || e.statusText,
    });
    return null;
  }
}
