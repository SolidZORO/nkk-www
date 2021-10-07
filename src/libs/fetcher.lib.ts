/* eslint-disable max-len */
import axios, { AxiosError } from 'axios';

import { configs } from '@/configs';
import { errorMsg, errorMsgTranslate } from '@/utils/msg.util';
// eslint-disable-next-line import/no-cycle

export const HEADERS_TYPE_JSON = {
  'Content-Type': 'application/json; charset=UTF-8',
};
export const FETCHER_TIMEOUT = configs.time.FETCH_TIMEOUT * 1000;
export const FETCHER_LANG = 'zh_CN';

export const fetcher = axios;

fetcher.defaults.timeout = FETCHER_TIMEOUT;
// @ts-ignore
fetcher.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; // prettier-ignore
// @ts-ignore
fetcher.defaults.headers.common['lang'] = FETCHER_LANG;

// 这里不再做 header token 赋值，交给 AppProvider.tsx
// eslint-disable-next-line max-len
// fetcher.defaults.headers.common.Authorization = checkUserIsAvailably() ? `Bearer ${getUserToken()}` : '';

// out ---> |
// Tips: all code > 400 Req Can be Normalify return.
fetcher.interceptors.request.use(
  (req) => {
    return req;
  },
  (err: AxiosError) => {
    console.log('❌❌❌ REQUEST-ERROR', err.toJSON(), err);

    return Promise.resolve(err.response);
  },
);

// | <--- in
// Tips: all code > 400 Res Can be Normalify return.
fetcher.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    console.log('❌❌❌ RESPONSE-ERROR', err.toJSON(), err);

    // @ts-ignore
    const resErrMsg = err.response?.data?.message || err.message;

    // 发现 401 代表 Token 失效，强制登出
    if (err.response?.status === 401) {
      window.__ROUTER_HISTORY__?.replace('/logout');
      return Promise.resolve(err?.response);
    }

    // TIMEOUT
    if (err?.code === 'ECONNABORTED') {
      console.error('📶 HTTP RESPONSE TIMEOUT >>>', err);
      errorMsg(errorMsgTranslate(resErrMsg));

      return Promise.resolve(err?.response);
    }

    if (resErrMsg) errorMsg(errorMsgTranslate(resErrMsg));

    // ERROR Normalify statusCode > 400
    return Promise.resolve(err?.response);
  },
);

export const setFetcherToken = (token: string) => {
  // @ts-ignore
  fetcher.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const deleteFetcherToken = () => {
  // @ts-ignore
  delete fetcher.defaults.headers.common.Authorization;
};

export const getFileUploadHeaders = () => ({
  // @ts-ignore
  Authorization: fetcher.defaults.headers.common.Authorization,
  // @ts-ignore
  'Accept-Language': fetcher.defaults.headers.common['Accept-Language'],
});
