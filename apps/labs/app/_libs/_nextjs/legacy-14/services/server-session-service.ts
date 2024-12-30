import { cookies } from 'next/headers';
import * as jose from 'jose';
import { User } from '../../current/interfaces/user';
import { SessionData } from '../../current/interfaces/session-data';
import Log from '../../current/services/log';

const ServerSessionService = {
  create(data: SessionData) {
    if (!data) {
      return;
    }

    const cookiesStore = cookies() as any;

    const expires = new Date(data.tokenExpiresIn);
    cookiesStore.set('tl_session', data.token, {
      path: '/',
      expires,
      secure: process.env.NODE_ENV === 'production',
    });

    if (data.refreshToken) {
      cookiesStore.set('tl_refresh', data.refreshToken, {
        path: '/',
        expires: data.refreshTokenExpiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      cookiesStore.set('tl_keep_alive', 'true', {
        path: '/',
        expires: data.refreshTokenExpiresIn,
        secure: process.env.NODE_ENV === 'production',
      });
    }
  },

  getSessionCookies() {
    const cookiesStore = cookies() as any;

    return {
      accessToken: cookiesStore.get('tl_session')?.value,
      refreshToken: cookiesStore.get('tl_refresh')?.value,
      keepAlive: cookiesStore.get('tl_keep_alive')?.value === 'true',
    };
  },

  getSession() {
    const accessToken = (cookies() as any).get('tl_session');

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
    let accessToken = (cookies() as any).get('tl_session');

    if (!accessToken?.value) {
      return false;
    }

    const { exp } = jose.decodeJwt(accessToken.value);
    const sessionValid = (exp as number) * 1000 > new Date().getTime();

    return sessionValid;
  },

  async validateRefreshToken() {
    const refreshToken = (cookies() as any).get('tl_refresh');

    if (!refreshToken?.value) {
      Log.info({
        where: 'validateRefreshToken',
        message: 'Invalid refresh token',
      });

      return {
        statusCode: 401,
      };
    }

    // TODO: when create lib, make sure to call the prod domain
    const url = `${process.env.NEXT_PUBLIC_TL_API}/auth/refresh`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'tl-env-id': process.env.NEXT_PUBLIC_TL_ENV_ID,
      } as HeadersInit & { 'tl-env-id': string },
      body: JSON.stringify({
        token: refreshToken.value,
      }),
    };
    Log.info({ where: 'validateRefreshToken', url, options });

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.statusCode || data.error) {
      Log.info({ where: 'validateRefreshToken', data });

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TL_API}/auth/magic/${token}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'tl-env-id': process.env.NEXT_PUBLIC_TL_ENV_ID,
          'tl-public-key': process.env.NEXT_PUBLIC_TL_PK,
        } as HeadersInit & { 'tl-env-id': string; 'tl-public-key': string },
      },
    );
    const data = await response.json();

    if (data.statusCode) {
      console.log('Error "validateMagicToken": ', data);

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TL_API}/auth/confirm-email/${token}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'tl-env-id': process.env.NEXT_PUBLIC_TL_ENV_ID,
          'tl-public-key': process.env.NEXT_PUBLIC_TL_PK,
        } as HeadersInit & { 'tl-env-id': string; 'tl-public-key': string },
      },
    );
    const data = await response.json();

    if (data.statusCode) {
      console.log('Error "validateEmailConfirmationToken": ', data);

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
          console.log('Error "shouldKeepAlive": Invalid refresh token');
          return {
            status: 'invalid_session',
          };
        }

        return {
          status: 'needs_refresh',
        };
      }

      if (!isValid) {
        console.log('Error "shouldKeepAlive": Invalid access token');
        return {
          status: 'invalid_session',
        };
      }

      return {
        status: 'valid_session',
      };
    } catch (e) {
      console.log('Error "shouldKeepAlive": ', e);
      return {
        status: 'invalid_session',
      };
    }
  },

  async logout() {
    const cookiesStore = cookies() as any;
    const token = cookiesStore.get('tl_session')?.value;
    await fetch(`${process.env.NEXT_PUBLIC_TL_API}/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'tl-env-id': process.env.NEXT_PUBLIC_TL_ENV_ID,
        'tl-public-key': process.env.NEXT_PUBLIC_TL_PK,
      } as HeadersInit & { 'tl-env-id': string; 'tl-public-key': string },
    });
    cookiesStore.delete('tl_session');
    cookiesStore.delete('tl_refresh');
    cookiesStore.delete('tl_keep_alive');
    cookiesStore.delete('tl_env');
  },
};

export default ServerSessionService;
