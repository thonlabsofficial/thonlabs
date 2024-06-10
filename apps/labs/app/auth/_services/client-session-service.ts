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
  async shouldKeepAlive(router: ReturnType<typeof useRouter>) {
    window.addEventListener('focus', async () => {
      try {
        const isValid = this.isValid();

        if (Cookies.get('tl_keep_alive') === 'true' && isValid === false) {
          await intAPI.post('/api/auth/refresh');
        }
      } catch (e) {
        toast({
          title: 'Logged out',
          description: apiResponseMessages['40002'],
        });
        intAPI.post('/api/auth/logout').then(() => {
          router.replace('/auth/login');
        });
      }
    });
  },
};

export default ClientSessionService;
