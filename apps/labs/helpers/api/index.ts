import Utils from '@repo/utils';
import axios, { InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const labsPublicAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TL_API,
  headers: {
    'tl-env-id': process.env.NEXT_PUBLIC_TL_ENV_ID,
    'tl-public-key': process.env.NEXT_PUBLIC_TL_PK,
  },
});
const labsAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TL_API,
  headers: {
    'tl-env-id': process.env.NEXT_PUBLIC_TL_ENV_ID,
    'tl-public-key': process.env.NEXT_PUBLIC_TL_PK,
  },
});
const intAPI = axios.create();

async function validateTokensInterceptor(
  config: InternalAxiosRequestConfig<any>,
) {
  let accessToken = Cookies.get('tl_session');

  if (!accessToken) {
    /* 
      Wait the /refresh finishes and try 10 times until get the access token 
      or send to response error interceptor
    */
    let round = 0;
    const retry = 10;

    while (round < retry) {
      if (accessToken) break;
      await Utils.delay(50);
      accessToken = Cookies.get('tl_session');
      round++;
    }

    if (!accessToken) {
      return config;
    }
  }

  config.headers['Authorization'] = `Bearer ${accessToken}`;

  return config;
}

async function handleResponseError(error: any) {
  const statusCode = error?.response?.status;

  switch (statusCode) {
    case 401:
      intAPI.post('/api/auth/logout');
      break;
  }

  return Promise.reject(error);
}

labsAPI.interceptors.request.use(validateTokensInterceptor);
labsAPI.interceptors.response.use((res) => res, handleResponseError);

intAPI.interceptors.response.use((res) => res, handleResponseError);

export { labsPublicAPI, labsAPI, intAPI };
