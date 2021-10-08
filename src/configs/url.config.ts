import { __env__ } from './env';

const API_VER = __env__.NEXT_PUBLIC_API_VER
  ? `/${__env__.NEXT_PUBLIC_API_VER}`
  : '';

export const url = {
  HOME: '/',
  LOGIN: '/login',
  //
  // env 里面已经没有 API_URL，而是在这里拼接
  API_URL: `${__env__.NEXT_PUBLIC_API_BASE_URL}${API_VER}`,
  CDN_URL: __env__.NEXT_PUBLIC_CDN_URL,
  UPLOAD_URL: __env__.NEXT_PUBLIC_UPLOAD_URL,
};
