import { cookies } from 'next/headers';
import { SessionData } from '../_actions/auth-actions';

const Session = {
  create(data: SessionData) {
    cookies().delete('tl_session');
    cookies().delete('tl_refresh');

    const expires = new Date(data.tokenExpiresIn);
    cookies().set('tl_session', data.token, {
      path: '/',
      // the 3 seconds is necessary only to validate better
      // the refresh token. In case of not exists, keep the token as is
      expires: data.refreshToken
        ? expires.setSeconds(expires.getSeconds() + 10)
        : expires,
    });

    if (data.refreshToken) {
      cookies().set('tl_refresh', data.refreshToken, {
        path: '/',
        expires: data.refreshTokenExpiresIn,
        httpOnly: true,
      });
    }
  },

  isValid() {
    return cookies().has('tl_session');
  },

  logout() {
    cookies().delete('tl_session');
    cookies().delete('tl_refresh');
  },
};

export default Session;
