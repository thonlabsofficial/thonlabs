import axios from 'axios';

export const labsAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TL_API,
});

export const intAPI = axios.create();
