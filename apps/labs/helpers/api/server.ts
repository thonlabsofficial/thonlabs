import { getTokens } from '@/_libs/_nextjs/server';
import Utils from '@repo/utils';
import Log from '@repo/utils/log';
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

const serverLabsInternalAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TL_API,
  headers: {
    'tl-int-key': process.env.TL_INTERNAL_API_KEY,
  },
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

function logRequest(instanceName: string) {
  return (config: InternalAxiosRequestConfig<any>) => {
    Log.info(instanceName, {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });

    return config;
  };
}

serverLabsInternalAPI.interceptors.request.use(
  logRequest('serverLabsInternalAPI'),
);
serverLabsEnvAPI.interceptors.request.use(logRequest('serverLabsEnvAPI'));
serverLabsEnvAPI.interceptors.request.use(validateTokensInterceptor);

export { serverLabsEnvAPI, serverEnvHeaders, serverLabsInternalAPI };
