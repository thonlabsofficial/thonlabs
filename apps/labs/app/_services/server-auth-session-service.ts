import { cookies } from 'next/headers';
import { Environment } from '@/_interfaces/environment';
import { getSession } from '@/_libs/_nextjs/server';
import { labsAPI } from '@helpers/api';

export type UserSession = ReturnType<typeof getSession>;

const ServerAuthSessionService = {
  getSession(): UserSession {
    return getSession();
  },
};

export default ServerAuthSessionService;
