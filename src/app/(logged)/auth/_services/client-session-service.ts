import Cookies from 'js-cookie';
import * as jose from 'jose';
import { intAPI } from '@/helpers/api';

const ClientSession = {
  refreshing: false,

  async isValid() {
    const accessToken = Cookies.get('tl_session');

    if (!accessToken) {
      await intAPI.post('/api/auth/logout');
      window.location.href = '/auth/login';
      return;
    }

    const { exp } = jose.decodeJwt(accessToken as string);
    const sessionValid = (exp as number) * 1000 > new Date().getTime();

    return sessionValid;
  },
  async shouldKeepAlive() {
    const isValid = await this.isValid();
    if (isValid) {
      const interval = setInterval(async () => {
        const isValid = await this.isValid();
        if (
          !this.refreshing &&
          Cookies.get('tl_keep_alive') === 'true' &&
          isValid === false
        ) {
          clearInterval(interval);
          this.refreshing = true;
          await intAPI.post('/api/auth/refresh');
          this.refreshing = false;
          this.shouldKeepAlive();
        }
      }, 1000);
    }
  },
};

export default ClientSession;
