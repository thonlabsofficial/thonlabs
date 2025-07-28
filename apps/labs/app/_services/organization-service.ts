'use server';

import { serverEnvHeaders, serverLabsEnvAPI } from '@helpers/api/server';
import { notFound } from 'next/navigation';
import type { OrganizationDetail } from '@/_interfaces/organization';

interface UsersResponse {
  items: OrganizationDetail[];
}

export async function fetchOrganizations(environmentId: string) {
  const { data } = await serverLabsEnvAPI.get<UsersResponse>(
    `/organizations`,
    serverEnvHeaders(environmentId)
  );

  if (!data?.items) {
    notFound();
  }

  return data;
}
