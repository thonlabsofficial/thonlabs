'use server';

import {
  serverEnvHeaders,
  serverLabsEnvAPI,
  serverLabsInternalAPI,
} from '@helpers/api/server';
import type { AxiosResponse } from 'axios';
import type { EnvironmentDetail } from '@/_interfaces/environment';
import type { EnvironmentAppData } from '@/_interfaces/environment-app-data';

type EnvironmentWithAppData = EnvironmentDetail & EnvironmentAppData;

export async function getEnvironmentById(
  environmentId: string
): Promise<EnvironmentWithAppData> {
  const [{ data: environment }, { data: environmentData }] = await Promise.all([
    serverLabsEnvAPI.get<EnvironmentDetail, AxiosResponse<EnvironmentDetail>>(
      `/environments/${environmentId}`,
      serverEnvHeaders(environmentId)
    ),
    serverLabsInternalAPI.get<
      EnvironmentAppData,
      AxiosResponse<EnvironmentAppData>
    >(`/environments/${environmentId}/data/app`),
  ]);

  return { ...environment, ...environmentData };
}
