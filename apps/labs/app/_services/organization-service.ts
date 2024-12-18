'use server';

import { OrganizationDetail } from '@/_interfaces/organization';
import { serverEnvHeaders, serverLabsEnvAPI } from '@helpers/api/server';
import { notFound } from 'next/navigation';

interface UsersResponse {
  items: OrganizationDetail[];
}

export async function fetchOrganizations(environmentId: string) {
  const { data } = await serverLabsEnvAPI.get<UsersResponse>(
    `/organizations`,
    serverEnvHeaders(environmentId),
  );

  if (!data?.items) {
    notFound();
  }

  return data;
}
