import { getTokens } from '@thonlabs/nextjs/server';
import Log from '@repo/utils/log';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
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
  const { accessToken } = await getTokens();

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
    Log.info(`${instanceName} req`, {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });

    return config;
  };
}

function logResponse(instanceName: string) {
  return (response: AxiosResponse) => {
    Log.info(`${instanceName} res`, {
      url: response.config.url,
      method: response.config.method,
      status: response.status,
      data: response.data,
    });

    return response;
  };
}

serverLabsInternalAPI.interceptors.request.use(
  logRequest('serverLabsInternalAPI'),
);
serverLabsInternalAPI.interceptors.response.use(
  logResponse('serverLabsInternalAPI'),
);
serverLabsEnvAPI.interceptors.request.use(logRequest('serverLabsEnvAPI'));
serverLabsEnvAPI.interceptors.response.use(logResponse('serverLabsEnvAPI'));
serverLabsEnvAPI.interceptors.request.use(validateTokensInterceptor);

export { serverLabsEnvAPI, serverEnvHeaders, serverLabsInternalAPI };
