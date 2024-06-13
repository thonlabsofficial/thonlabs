import Cookies from 'js-cookie';
import * as jose from 'jose';
import { intAPI } from '@helpers/api';
import { toast } from '@repo/ui/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { apiResponseMessages } from '../../(labs)/_providers/thon-labs-provider';
import { User } from '../_interfaces/user';

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
  redirectToLogout(router: ReturnType<typeof useRouter>) {
    toast({
      title: 'Logged out',
      description: apiResponseMessages['40002'],
    });
    intAPI.post('/api/auth/logout').then(() => {
      router.replace('/auth/login');
    });
  },
  async shouldKeepAlive(router: ReturnType<typeof useRouter>) {
    try {
      const isValid = this.isValid();

      if (isValid === false) {
        if (Cookies.get('tl_keep_alive') === 'true') {
          await intAPI.post('/api/auth/refresh');
        } else {
          this.redirectToLogout(router);
        }
      }
    } catch (e) {
      this.redirectToLogout(router);
    }
  },
};

export default ClientSessionService;
