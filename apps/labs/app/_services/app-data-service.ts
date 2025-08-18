'use server';

import { AppData } from '@/_interfaces/app-data';
import { serverLabsInternalAPI } from '@helpers/api/server';

export async function getAppData() {
  const { data } = await serverLabsInternalAPI.get<AppData>(`/app/data`);

  return data;
}
