'use server';

import { User } from '@/_interfaces/user';
import { serverEnvHeaders, serverLabsEnvAPI } from '@helpers/api/server';
import { notFound } from 'next/navigation';

interface UsersResponse {
  items: User[];
}

export async function fetchUsers(environmentId: string) {
  const { data } = await serverLabsEnvAPI.get<UsersResponse>(
    `/users`,
    serverEnvHeaders(environmentId),
  );

  if (!data?.items) {
    notFound();
  }

  return data;
}
