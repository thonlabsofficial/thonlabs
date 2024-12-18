'use server';

import { EnvironmentAppData } from '@/_interfaces/environment-app-data';
import { serverLabsInternalAPI } from '@helpers/api/server';
import Log from '@repo/utils/log';

export async function getAppData(environmentId: string) {
  const excludeIds = ['waitlist'];

  try {
    const { data } = await serverLabsInternalAPI.get<EnvironmentAppData>(
      `/environments/${environmentId}/data/app`,
    );

    const filteredData = Object.keys(data).reduce<Record<string, any>>(
      (acc, key) => {
        if (!excludeIds.includes(key)) {
          acc[key] = data[key as keyof EnvironmentAppData];
        }
        return acc;
      },
      {},
    );

    return filteredData as EnvironmentAppData;
  } catch (error) {
    Log.info('getAppData', {
      error: (error as Error).message,
    });
    throw new Error((error as Error).message);
  }
}
