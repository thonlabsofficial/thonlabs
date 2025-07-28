'use server';

import { serverEnvHeaders, serverLabsEnvAPI } from '@helpers/api/server';
import { notFound } from 'next/navigation';
import type { User } from '@/_interfaces/user';

interface UsersResponse {
  items: User[];
}

export async function fetchUsers(environmentId: string) {
  const { data } = await serverLabsEnvAPI.get<UsersResponse>(
    `/users`,
    serverEnvHeaders(environmentId)
  );

  if (!data?.items) {
    notFound();
  }

  return data;
}
