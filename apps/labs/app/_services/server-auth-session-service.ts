'use server';

import { getSession } from '@/_libs/_nextjs/server';

export type UserSession = ReturnType<typeof getSession>;

export async function getAuthSession(): Promise<UserSession> {
  return getSession();
}
