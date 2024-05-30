import Cookies from 'js-cookie';
import * as jose from 'jose';
import { intAPI } from '@helpers/api';
import { toast } from '@repo/ui/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { apiErrorMessages } from '../../(labs)/_providers/thon-labs-provider';

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
          description: apiErrorMessages['40002'],
        });
        intAPI.post('/api/auth/logout').then(() => {
          router.replace('/auth/login');
        });
      }
    });
  },
};

export default ClientSessionService;
