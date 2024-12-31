import { cookies } from 'next/headers';
import * as jose from 'jose';
import { User } from '../interfaces/user';
import { SessionData } from '../interfaces/session-data';
import Log from '../../shared/utils/log';
import { labsPublicAPI } from '../../shared/utils/api';

const ServerSessionService = {
  create(data: SessionData) {
    if (!data) {
      return;
    }

    const cookieStore = cookies() as any;

    const expires = new Date(data.tokenExpiresIn);
    cookieStore.set('tl_session', data.token, {
      path: '/',
      expires,
      secure: process.env.NODE_ENV === 'production',
    });

    if (data.refreshToken) {
      cookieStore.set('tl_refresh', data.refreshToken, {
        path: '/',
        expires: data.refreshTokenExpiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      cookieStore.set('tl_keep_alive', 'true', {
        path: '/',
        expires: data.refreshTokenExpiresIn,
        secure: process.env.NODE_ENV === 'production',
      });
    }
  },

  getSessionCookies() {
    const cookieStore = cookies() as any;

    return {
      accessToken: cookieStore.get('tl_session')?.value,
      refreshToken: cookieStore.get('tl_refresh')?.value,
      keepAlive: cookieStore.get('tl_keep_alive')?.value === 'true',
    };
  },

  getSession() {
    const cookieStore = cookies() as any;
    const accessToken = cookieStore.get('tl_session');

    if (!accessToken?.value) {
      return {
        user: null,
      };
    }

    const session = jose.decodeJwt<User>(accessToken?.value as string);

    return {
      user: {
        id: session.sub as string,
        fullName: session.fullName,
        email: session.email,
        profilePicture: session.profilePicture,
      },
    };
  },

  isValid() {
    const cookieStore = cookies() as any;
    let accessToken = cookieStore.get('tl_session');

    if (!accessToken?.value) {
      return false;
    }

    const { exp } = jose.decodeJwt(accessToken.value);
    const sessionValid = (exp as number) * 1000 > new Date().getTime();

    return sessionValid;
  },

  async validateRefreshToken() {
    const cookieStore = cookies() as any;
    const refreshToken = cookieStore.get('tl_refresh');

    if (!refreshToken?.value) {
      Log.error({
        action: 'validateRefreshToken',
        message: 'Invalid refresh token',
      });

      return {
        statusCode: 401,
      };
    }

    const response = await labsPublicAPI('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({
        token: refreshToken.value,
      }),
    });
    const data = await response.json();

    if (data.statusCode || data.error) {
      Log.error({
        action: 'validateRefreshToken',
        message: data?.error || data?.message || data?.statusMessage,
        data,
      });

      return {
        statusCode: 401,
        error: data?.error || data?.message,
      };
    }

    this.create(data.data);

    return {
      statusCode: 200,
    };
  },

  async validateMagicToken(token: string) {
    const response = await labsPublicAPI(`/auth/magic/${token}`);
    const data = await response.json();

    if (data.statusCode) {
      Log.error({
        action: 'validateMagicToken',
        message: data?.error || data?.message || data?.statusMessage,
        data,
      });

      return {
        statusCode: data.statusCode,
        error: data?.error || data?.message,
      };
    }

    this.create(data);

    return {
      statusCode: 200,
    };
  },

  async validateEmailConfirmationToken(token: string) {
    const response = await labsPublicAPI(`/auth/confirm-email/${token}`);
    const data = await response.json();

    if (data.statusCode) {
      Log.error({
        action: 'validateEmailConfirmationToken',
        message: data?.error || data?.message || data?.statusMessage,
        data,
      });

      return {
        statusCode: data.statusCode,
        error: data?.error || data?.message,
        data: { emailResent: data?.emailResent },
      };
    }

    return {
      statusCode: 200,
      ...data,
    };
  },

  async shouldKeepAlive() {
    try {
      const isValid = this.isValid();
      const { keepAlive, refreshToken } = this.getSessionCookies();

      if (keepAlive && isValid === false) {
        if (!refreshToken) {
          Log.error({
            action: 'shouldKeepAlive',
            message: 'Invalid refresh token',
          });
          return {
            status: 'invalid_session',
          };
        }

        return {
          status: 'needs_refresh',
        };
      }

      if (!isValid) {
        Log.error({
          action: 'shouldKeepAlive',
          message: 'Invalid access token',
        });
        return {
          status: 'invalid_session',
        };
      }

      return {
        status: 'valid_session',
      };
    } catch (e) {
      Log.error({
        action: 'shouldKeepAlive',
        message: 'Error "shouldKeepAlive": ',
        error: e,
      });
      return {
        status: 'invalid_session',
      };
    }
  },

  async logout() {
    const cookieStore = cookies() as any;
    const token = cookieStore.get('tl_session')?.value;
    await labsPublicAPI('/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    cookieStore.delete('tl_session');
    cookieStore.delete('tl_refresh');
    cookieStore.delete('tl_keep_alive');
    cookieStore.delete('tl_env');
  },
};

export default ServerSessionService;
