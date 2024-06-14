import { cookies } from 'next/headers';
import ServerSessionService from '../../auth/_services/server-session-service';
import { Environment } from '@/(labs)/_interfaces/environment';

const ServerUserSession = {
  getSession() {
    return ServerSessionService.getSession();
  },
  getEnv() {
    const env = cookies().get('tl_env');

    return env ? (JSON.parse(env.value) as Environment) : null;
  },
};

export default ServerUserSession;
