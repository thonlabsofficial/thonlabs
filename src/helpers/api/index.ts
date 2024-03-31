import axios, { InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import * as jose from 'jose';

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
  config: InternalAxiosRequestConfig<any>
) {
  let accessToken = Cookies.get('tl_session');

  if (!accessToken) {
    const controller = new AbortController();

    await intAPI.post('/api/auth/logout');

    controller.abort();

    window.location.href = '/auth/login';

    return {
      ...config,
      signal: controller.signal,
    };
  }

  const { exp } = jose.decodeJwt(accessToken as string);
  const sessionValid = (exp as number) * 1000 > new Date().getTime();

  if (!sessionValid) {
    await intAPI.post('/api/auth/refresh');
  }

  accessToken = Cookies.get('tl_session');
  config.headers['Authorization'] = `Bearer ${accessToken}`;

  return config;
}

async function handleResponseError(error: any) {
  const statusCode = error?.response?.status;

  switch (statusCode) {
    case 401:
      await intAPI.post('/api/auth/logout');
      window.location.href = '/auth/login';
      break;
  }

  return Promise.reject(error);
}

labsAPI.interceptors.request.use(validateTokensInterceptor);
labsAPI.interceptors.response.use((res) => res, handleResponseError);

export { labsPublicAPI, labsAPI, intAPI };
