import { cookies } from 'next/headers';
import { Environment } from '@/(labs)/_interfaces/environment';
import { getSession } from '@/_libs/_nextjs/server';

export type UserSession = ReturnType<typeof getSession>;

const ServerAuthSessionService = {
  getSession(): UserSession {
    return getSession();
  },
  getEnv() {
    const env = cookies().get('tl_env');

    return env ? (JSON.parse(env.value) as Environment) : null;
  },
};

export default ServerAuthSessionService;
