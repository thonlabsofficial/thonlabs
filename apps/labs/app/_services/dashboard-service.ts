'use server';

import { serverEnvHeaders, serverLabsEnvAPI } from '@helpers/api/server';

interface GetSummaryResponse {
  totalActiveUsers: number;
  monthlyActiveUsers: number;
  currentMonthSignUps: number;
  totalActiveOrganizations: number;
}

export async function getDashboardSummary(environmentId: string) {
  const { data } = await serverLabsEnvAPI.get<GetSummaryResponse>(
    `/dashboard/summary`,
    serverEnvHeaders(environmentId),
  );

  return data;
}
