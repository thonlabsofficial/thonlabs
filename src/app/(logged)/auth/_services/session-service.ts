import { cookies } from 'next/headers';
import { SessionData } from '../_actions/auth-actions';

const Session = {
  create(data: SessionData) {
    cookies().delete('tl_session');
    cookies().delete('tl_refresh');
    cookies().delete('tl_keep_alive');

    const expires = new Date(data.tokenExpiresIn);
    cookies().set('tl_session', data.token, {
      path: '/',
      // the 3 seconds is necessary only to validate better
      // the refresh token. In case of not exists, keep the token as is
      expires: data.refreshToken
        ? expires.setSeconds(expires.getSeconds() + 10)
        : expires,
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

  isValid() {
    return cookies().has('tl_session');
  },

  logout() {
    cookies().delete('tl_session');
    cookies().delete('tl_refresh');
    cookies().delete('tl_keep_alive');
  },
};

export default Session;
