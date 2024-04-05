import Cookies from 'js-cookie';
import * as jose from 'jose';
import { intAPI } from '@/helpers/api';
import { toast } from '@/ui/components/ui/use-toast';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { apiErrorMessages } from '../../labs/_providers/thon-labs-provider';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const ClientSessionService = {
  refreshing: false,

  isValid(router: ReturnType<typeof useRouter>) {
    const accessToken = Cookies.get('tl_session');

    if (!accessToken) {
      toast({
        title: 'Logged out',
        description: apiErrorMessages['40002'],
      });
      intAPI.post('/api/auth/logout').then(() => {
        router.replace('/auth/login');
      });
      return;
    }

    const { exp } = jose.decodeJwt(accessToken as string);
    const sessionValid = (exp as number) * 1000 > new Date().getTime();

    return sessionValid;
  },
  async shouldKeepAlive(router: ReturnType<typeof useRouter>) {
    const isValid = this.isValid(router);
    console.log('1. is valid', isValid);

    if (isValid) {
      while (true) {
        try {
          await delay(1000);

          const isValid = this.isValid(router);

          if (isValid === undefined) {
            break;
          }

          if (
            !this.refreshing &&
            Cookies.get('tl_keep_alive') === 'true' &&
            isValid === false
          ) {
            this.refreshing = true;

            await intAPI.post('/api/auth/refresh');

            this.refreshing = false;

            await delay(1000);
          }
        } catch (e) {
          toast({
            title: 'Error',
            description:
              ((e as AxiosError)?.response?.data as string) ||
              apiErrorMessages[0],
          });
          intAPI.post('/api/auth/logout').then(() => {
            router.replace('/auth/login');
          });
        }
      }
    }
  },
};

export default ClientSessionService;
