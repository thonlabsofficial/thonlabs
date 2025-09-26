import { getAccessToken } from '@thonlabs/nextjs/server';
import Log from '@repo/utils/log';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import https from 'https';

const httpsAgent =
  process.env.SSL_ON_DEV === 'true'
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
  config.headers['Authorization'] = `Bearer ${await getAccessToken()}`;

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
    const headers = {
      ...config.headers,
      ...(config.headers['tl-int-key'] && {
        'tl-int-key':
          config.headers['tl-int-key']?.toString()?.substring(0, 5) +
          '...[REDACTED]',
      }),
      ...(config.headers['Authorization'] && {
        Authorization: `${config.headers['Authorization']?.toString()?.substring(0, 20)}...[REDACTED]`,
      }),
    };

    Log.info(`${instanceName} req`, {
      url: config.url,
      method: config.method,
      headers,
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
