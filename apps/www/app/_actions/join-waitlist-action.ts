'use server';

import { labsInternalAPI } from '@helpers/api';
import type { DataReturn } from '@repo/utils/data-return';
import type { AxiosError } from 'axios';
import type { JoinWaitlistFormData } from '@/_validators/general-validators';

export async function joinWaitlistAction(
  payload: JoinWaitlistFormData
): Promise<DataReturn> {
  try {
    const { data } = await labsInternalAPI.post(
      `/waitlist/${process.env.TL_ENV_ID}`,
      payload
    );

    return data;
  } catch (e: any) {
    console.log('Error on joinWaitlistAction:', {
      error: e.message,
    });
    return (e as AxiosError)?.response?.data as DataReturn;
  }
}
