/* eslint-disable max-len */
import Axios, { AxiosError } from 'axios';

import { configs } from '@/configs';
import { errorMsg, errorMsgTranslate } from '@/utils/msg.util';
// eslint-disable-next-line import/no-cycle

export const HEADERS_TYPE_JSON = {
  'Content-Type': 'application/json; charset=UTF-8',
};
export const FETCHER_TIMEOUT = configs.time.FETCH_TIMEOUT * 1000;
export const FETCHER_LANG = 'zh_CN';

export const axios = Axios;

axios.defaults.timeout = FETCHER_TIMEOUT;
// @ts-ignore
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; // prettier-ignore
// @ts-ignore
axios.defaults.headers.common['lang'] = FETCHER_LANG;

// out ---> |
// Tips: all code > 400 Req Can be Normalify return.
axios.interceptors.request.use(
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
axios.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    console.log('❌❌❌ RESPONSE-ERROR', err.toJSON(), err);

    // @ts-ignore
    const resErrMsg = err.response?.data?.message || err.message;

    // 发现 401 代表 Token 失效，强制登出
    if (err.response?.status === 401) {
      // @ts-ignore
      window.__ROUTER_NAVIGATE__('/logout', { replace: true });
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

export const setAxiosToken = (token: string) => {
  // @ts-ignore
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAxiosToken = () => {
  // @ts-ignore
  delete axios.defaults.headers.common.Authorization;
};

export const getFileUploadHeaders = () => ({
  // @ts-ignore
  Authorization: axios.defaults.headers.common.Authorization,
  // @ts-ignore
  'Accept-Language': axios.defaults.headers.common['Accept-Language'],
});
