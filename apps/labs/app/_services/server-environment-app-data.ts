import { EnvironmentAppData } from '@/_interfaces/environment-app-data';
import { getSession } from '@/_libs/_nextjs/server';
import { serverLabsInternalAPI } from '@helpers/api/server';
import { ValueOf } from 'next/dist/shared/lib/constants';

export type UserSession = ReturnType<typeof getSession>;

const ServerEnvironmentAppDataService = {
  async getAppData(environmentId: string) {
    const excludeIds = ['waitlist'];

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
  },
};

export default ServerEnvironmentAppDataService;
