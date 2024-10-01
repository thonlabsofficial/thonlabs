import { cookies } from 'next/headers';
import { Environment } from '@/(labs)/_interfaces/environment';
import { getSession } from '@/_libs/_nextjs/server';
import { labsAPI } from '@helpers/api';

export type UserSession = ReturnType<typeof getSession>;

const ServerAuthSessionService = {
  getSession(): UserSession {
    return getSession();
  },
  async getEnv(environmentId: string) {
    // const { data } = await labsAPI.get(`/environment/${environmentId}`);
    // const env = cookies().get('tl_env');
    // return data;
  },
};

export default ServerAuthSessionService;
