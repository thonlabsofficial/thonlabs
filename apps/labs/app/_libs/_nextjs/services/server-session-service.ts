import { cookies } from 'next/headers';
import * as jose from 'jose';
import { User } from '../interfaces/user';
import { SessionData } from '../interfaces/session-data';

const ServerSessionService = {
  create(data: SessionData) {
    if (!data) {
      return;
    }

    const expires = new Date(data.tokenExpiresIn);
    cookies().set('tl_session', data.token, {
      path: '/',
      expires,
      secure: process.env.NODE_ENV === 'production',
    });

    if (data.refreshToken) {
      cookies().set('tl_refresh', data.refreshToken, {
        path: '/',
        expires: data.refreshTokenExpiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      cookies().set('tl_keep_alive', 'true', {
        path: '/',
        expires: data.refreshTokenExpiresIn,
        secure: process.env.NODE_ENV === 'production',
      });
    }
  },

  getSessionCookies() {
    return {
      accessToken: cookies().get('tl_session')?.value,
      refreshToken: cookies().get('tl_refresh')?.value,
      keepAlive: cookies().get('tl_keep_alive')?.value === 'true',
    };
  },

  getSession() {
    const accessToken = cookies().get('tl_session');

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
    let accessToken = cookies().get('tl_session');

    if (!accessToken?.value) {
      return false;
    }

    const { exp } = jose.decodeJwt(accessToken.value);
    const sessionValid = (exp as number) * 1000 > new Date().getTime();

    return sessionValid;
  },

  async validateRefreshToken() {
    const refreshToken = cookies().get('tl_refresh');

    if (!refreshToken?.value) {
      console.log('Error "validateRefreshToken": Invalid refresh token');

      return {
        statusCode: 401,
      };
    }

    const response = await fetch(
      // TODO: when create lib, make sure to call the prod domain
      `${process.env.NEXT_PUBLIC_TL_API}/auth/refresh`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'tl-env-id': process.env.NEXT_PUBLIC_TL_ENV_ID,
        } as HeadersInit & { 'tl-env-id': string },
        body: JSON.stringify({
          token: refreshToken.value,
        }),
      },
    );
    const data = await response.json();

    if (data.statusCode || data.error) {
      console.log('Error "validateRefreshToken": ', data);

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
    const token = cookies().get('tl_session')?.value;
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
    cookies().delete('tl_session');
    cookies().delete('tl_refresh');
    cookies().delete('tl_keep_alive');
    cookies().delete('tl_env');
  },
};

export default ServerSessionService;
