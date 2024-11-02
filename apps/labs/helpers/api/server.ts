import { getTokens } from '@/_libs/_nextjs/server';
import { InternalAxiosRequestConfig } from 'axios';

import axios from 'axios';
import https from 'https';

const httpsAgent =
  process.env.NODE_ENV === 'development'
    ? new https.Agent({
        rejectUnauthorized: false,
      })
    : null;

// Used together with env ID
const serverLabsEnvAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TL_API,
  httpsAgent,
});

async function validateTokensInterceptor(
  config: InternalAxiosRequestConfig<any>,
) {
  const { accessToken } = getTokens();

  config.headers['Authorization'] = `Bearer ${accessToken}`;

  return config;
}

function serverEnvHeaders(envID: string) {
  return {
    headers: {
      'tl-env-id': envID,
    },
  };
}

serverLabsEnvAPI.interceptors.request.use(validateTokensInterceptor);

export { serverLabsEnvAPI, serverEnvHeaders };
