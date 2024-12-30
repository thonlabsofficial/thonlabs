import { cookies } from 'next/headers';
import * as jose from 'jose';
import { User } from '../interfaces/user';
import { SessionData } from '../interfaces/session-data';
import Log from './log';

const ServerSessionService = {
  sessionToBase64(data: SessionData): string {
    const sessionData = [
      data.token,
      data.tokenExpiresIn,
      data.refreshToken,
      data.refreshTokenExpiresIn,
    ];
    return Buffer.from(sessionData.join('|')).toString('base64');
  },

  sessionFromBase64(data: string): SessionData {
    const sessionData = Buffer.from(data, 'base64')
      .toString('utf-8')
      .split('|');

    return {
      token: sessionData[0] as string,
      tokenExpiresIn: parseInt(sessionData[1] as string),
      refreshToken: sessionData?.[2] as string,
      refreshTokenExpiresIn: sessionData?.[3]
        ? parseInt(sessionData?.[3] as string)
        : undefined,
    } as SessionData;
  },

  async create(data: SessionData) {
    if (!data) {
      return;
    }

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
  },

  async getSessionCookies() {
    const { get } = await cookies();

    return {
      accessToken: get('tl_session')?.value,
      refreshToken: get('tl_refresh')?.value,
      keepAlive: get('tl_keep_alive')?.value === 'true',
    };
  },

  async getSession() {
    const { get } = await cookies();
    const accessToken = get('tl_session');

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

  async isValid() {
    const { get } = await cookies();
    let accessToken = get('tl_session');

    if (!accessToken?.value) {
      return false;
    }

    const { exp } = jose.decodeJwt(accessToken.value);
    const sessionValid = (exp as number) * 1000 > new Date().getTime();

    return sessionValid;
  },

  async validateRefreshToken() {
    const { get } = await cookies();
    const refreshToken = get('tl_refresh');

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
      const isValid = await this.isValid();
      const { keepAlive, refreshToken } = await this.getSessionCookies();

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
    const { get, delete: deleteCookie } = await cookies();
    const token = get('tl_session')?.value;
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
    deleteCookie('tl_session');
    deleteCookie('tl_refresh');
    deleteCookie('tl_keep_alive');
    deleteCookie('tl_env');
  },
};

export default ServerSessionService;
