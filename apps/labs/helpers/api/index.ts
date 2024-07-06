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
      window.location.href = '/login?reason=unauthorized';
      break;
  }

  return Promise.reject(error);
}

labsAPI.interceptors.request.use(validateTokensInterceptor);
labsAPI.interceptors.response.use((res) => res, handleResponseError);

intAPI.interceptors.response.use((res) => res, handleResponseError);

export { labsPublicAPI, labsAPI, intAPI };
