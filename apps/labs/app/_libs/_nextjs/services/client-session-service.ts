import Cookies from 'js-cookie';
import * as jose from 'jose';
import { intAPI } from '../../../../helpers/api';
import { User } from '../interfaces/user';
import Utils from '@repo/utils';
import { APIResponseCodes } from '../utils/errors';

const ClientSessionService = {
  refreshing: false,

  isValid() {
    const accessToken = Cookies.get('tl_session');

    if (!accessToken) {
      return false;
    }

    const { exp } = jose.decodeJwt(accessToken as string);
    const sessionValid = (exp as number) * 1000 > new Date().getTime();

    return sessionValid;
  },
  getSession(): User | null {
    const accessToken = Cookies.get('tl_session');

    if (!accessToken) {
      return null;
    }

    const session = jose.decodeJwt<User>(accessToken as string);

    return {
      id: session.sub as string,
      fullName: session.fullName,
      email: session.email,
      profilePicture: session.profilePicture,
    };
  },
  redirectToLogout() {
    intAPI.post('/api/auth/logout').then(() => {
      window.location.href = `/auth/login?reason=${APIResponseCodes.SessionExpired}`;
    });
  },
  async logout() {
    await intAPI.post('/api/auth/logout');
    await Utils.delay(200);
    window.location.href = `/auth/login?reason=${APIResponseCodes.Logout}`;
  },
  async shouldKeepAlive() {
    try {
      if (window.location.pathname.startsWith('/auth')) {
        return;
      }

      /*
        This delay is necessary to live together with "validateTokensInterceptor"
        from API client.
      */
      await Utils.delay(50);

      const isRefreshing = localStorage.getItem('tl_refreshing') === 'true';
      if (!isRefreshing) {
        const isValid = this.isValid();

        if (isValid === false) {
          if (Cookies.get('tl_keep_alive') === 'true') {
            await intAPI.post('/api/auth/refresh');
          } else {
            this.redirectToLogout();
          }
        }
      }
    } catch (e) {
      console.error(e);
      this.redirectToLogout();
    }
  },
};

export default ClientSessionService;
