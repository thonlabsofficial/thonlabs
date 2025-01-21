'use server';

import { getSession } from '@thonlabs/nextjs/server';

export type UserSession = Awaited<ReturnType<typeof getSession>>;

export async function getAuthSession(): Promise<UserSession> {
  return getSession();
}
