import axios, { InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import qs from 'qs';
import https from 'https';
import { APIResponseCodes } from '@/_libs/_nextjs/v14';

const httpsAgent =
  process.env.NODE_ENV === 'development'
    ? new https.Agent({
        rejectUnauthorized: false,
      })
    : null;

// Used together with env ID and public key, not sure if will be necessary to this APP
const labsAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TL_API,
  headers: {
    'tl-env-id': process.env.NEXT_PUBLIC_TL_ENV_ID,
    'tl-public-key': process.env.NEXT_PUBLIC_TL_PK,
  },
  httpsAgent,
});

// Used together with env ID
const labsEnvAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TL_API,
  httpsAgent,
});

// Calls internal APIs (BFF)
const intAPI = axios.create();
const intFetcher = (url: string) => intAPI.get(url).then((res) => res.data);

// This is used to fetch data in endpoints like /environments
// I think it's possible to use only the "envFetcher" and in case of
// doesn't have an envID I can use the env var
const fetcher = (url: string) => labsAPI.get(url).then((res) => res.data);

const envFetcher = (envID: string) => (url: string) =>
  labsEnvAPI
    .get(url, {
      headers: { 'tl-env-id': envID },
    })
    .then((res) => res.data);

async function validateTokensInterceptor(
  config: InternalAxiosRequestConfig<any>,
) {
  let accessToken = Cookies.get('tl_session');

  if (!accessToken) {
    localStorage.setItem('tl_refreshing', 'true');

    await intAPI.post('/api/auth/refresh');
    accessToken = Cookies.get('tl_session');

    localStorage.removeItem('tl_refreshing');
  }

  config.headers['Authorization'] = `Bearer ${accessToken}`;

  return config;
}

async function handleResponseError(error: any) {
  const statusCode = error?.response?.status;

  switch (statusCode) {
    case 401:
      // TODO: if react only, clear here using Cookies lib
      await intAPI.post('/api/auth/logout');
      localStorage.removeItem('tl_refreshing');
      window.location.href = `/auth/login?reason=${APIResponseCodes.SessionExpired}`;
      break;
  }

  return Promise.reject(error);
}

// This is used to create different caches for each environment
function envURL(url: string, envID: string, queryString: any = {}) {
  return `${url}${qs.stringify(
    {
      ...queryString,
      c: envID?.split('-')?.reverse()[0]?.substring(0, 5),
    },
    { addQueryPrefix: true },
  )}`;
}

// This is used to add headers in POST, PATCH, PUT, DELETE requests
function envHeaders(envID: string) {
  return {
    headers: {
      'tl-env-id': envID,
    },
  };
}

labsAPI.interceptors.request.use(validateTokensInterceptor);
labsAPI.interceptors.response.use((res) => res, handleResponseError);

labsEnvAPI.interceptors.request.use(validateTokensInterceptor);
labsEnvAPI.interceptors.response.use((res) => res, handleResponseError);

intAPI.interceptors.response.use((res) => res, handleResponseError);

export {
  labsAPI,
  intAPI,
  labsEnvAPI,
  fetcher,
  intFetcher,
  envFetcher,
  envURL,
  envHeaders,
};
