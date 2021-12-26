import _ from 'lodash';
import moment from 'moment';
import Cookies from 'js-cookie';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import { configs } from '@/configs';
import { IAuthUser } from '@/types';
import { handleAxiosGetCatch } from '@/utils/axios.util';
import { errorMsg } from '@/utils/msg.util';
import { axios } from '@/libs/axios.lib';
import { IAxiosRawResItem } from '@/types/api';
import { isServer } from '@/utils/env.util';

/*
|-------------------------------------------------------------------------------
| User Token
|-------------------------------------------------------------------------------
|
*/

export const getCookieUserToken = (
  opts: { onlyToken?: boolean; token?: string | null } = {
    onlyToken: false,
    token: null,
  },
): string => {
  // 这里直接传 token 感觉比较奇怪，但是在 _app.ts 初始化时，数据要从 cookie 拿
  // 所以，就拿 cookie 的 token 直接传进来判断
  const userToken = opts?.token || Cookies.get(configs.user.USER_TOKEN_NAME);

  if (!userToken) {
    // console.log('🔑 Not Found Token');
    return '';
  }

  if (userToken && opts?.onlyToken) return userToken.replace(/^Bearer\s/, '');

  return userToken;
};

export const setCookieUserToken = (token: string, expiresIn: string) => {
  const expires = moment(expiresIn).toDate();

  Cookies.set(configs.user.USER_TOKEN_NAME, token, { expires });
  Cookies.set(configs.user.USER_TOKEN_EXPIRES_IN_NAME, expiresIn, { expires });
};

export const removeCookieUserToken = (): boolean => {
  if (!getCookieUserToken) return false;

  Cookies.remove(configs.user.USER_TOKEN_NAME);

  return true;
};

/*
|-------------------------------------------------------------------------------
| User Token Expires
|-------------------------------------------------------------------------------
|
*/

export const getCookieUserTokenExpiresIn = (): string | undefined => {
  const userTokenExpiresIn = Cookies.get(
    configs.user.USER_TOKEN_EXPIRES_IN_NAME,
  );

  return !userTokenExpiresIn ? undefined : userTokenExpiresIn;
};

export const removeCookieUserTokenExpiresIn = (): boolean => {
  Cookies.remove(configs.user.USER_TOKEN_EXPIRES_IN_NAME);

  return true;
};

/*
|-------------------------------------------------------------------------------
| User Info
|-------------------------------------------------------------------------------
|
*/

export const getCookieUserInfoStr = (userInfoStr?: string) => {
  return userInfoStr || Cookies.get(configs.user.USER_INFO_NAME);
};

export const getCookieUserInfo = (opts?: {
  userInfoStr?: string;
}): Required<IAuthUser> => {
  const nextInfo: Partial<IAuthUser> = {
    id: 0,
    email: '',
    phone: '',
    name: '',
  };

  const userInfoStr = getCookieUserInfoStr(opts?.userInfoStr);

  return userInfoStr
    ? {
        ...nextInfo,
        ...JSON.parse(userInfoStr),
      }
    : nextInfo;
};

export const setCookieUserInfo = (info?: Partial<IAuthUser> | null) => {
  // if (!info) {
  //   errorMsg('User Info Error');
  //   return;
  // }

  const expires = moment().add(10, 'years').toDate();

  Cookies.set(configs.user.USER_INFO_NAME, JSON.stringify(info), { expires });
};

export const removeCookieUserInfo = (): boolean => {
  if (!getCookieUserInfo()) return false;

  Cookies.remove(configs.user.USER_INFO_NAME);

  return true;
};

export const clearCookieUser = (): boolean => {
  const removedUserInfo = removeCookieUserInfo();
  const removedUserToken = removeCookieUserToken();
  const removedUserTokenExpiresIn = removeCookieUserTokenExpiresIn();

  return removedUserToken && removedUserTokenExpiresIn && removedUserInfo;
};

/*
|-------------------------------------------------------------------------------
| Tools
|-------------------------------------------------------------------------------
|
*/

export const checkCookieUserIsAvailably = (opts?: {
  token?: string;
  tokenExpiresIn?: string;
  userInfoStr?: string;
}): boolean => {
  // 这里直接传 token 感觉比较奇怪，但是在 _app.ts 初始化时，数据要从 cookie 拿
  // 所以，就拿 cookie 的 token 直接传进来判断
  if (opts?.token) return true;

  const userToken = opts?.token || getCookieUserToken();
  const userInfo = getCookieUserInfo({ userInfoStr: opts?.userInfoStr });
  const userTokenExpiresIn =
    opts?.tokenExpiresIn || getCookieUserTokenExpiresIn();
  const expired = moment().isAfter(userTokenExpiresIn);

  if (!userToken || !userInfo || !userTokenExpiresIn) {
    return false;
  }

  if ((userToken && expired) || _.isEmpty(userInfo)) {
    errorMsg('Token Expired');
  }

  if (!userToken || expired) {
    clearCookieUser();

    return false;
  }

  return true;
};

export const refreshUserInfoByApi = (): Promise<IAuthUser> =>
  new Promise((resolve) => {
    axios
      .get<any, IAxiosRawResItem<IAuthUser>>(`${configs.url.API_URL}/auth/me`)
      .then((res) => {
        if (!res?.data?.data) {
          console.error('setUserInfoFromApi', res);

          errorMsg('获取用户信息失败');
          return;
          // reject();
        }

        const info = res.data.data;
        if (info) setCookieUserInfo(info);

        resolve(info);
      })
      .catch(handleAxiosGetCatch);
  });

export const getDiffPermissions = (oldPms: string[], newPms: string[]) => {
  if (!newPms) return false;

  if (!_.isEqual(oldPms, newPms)) {
    // 如果两次权限不一样，需要传新的 pms 出去
    return newPms;
  }

  return false;
};

/*
|-------------------------------------------------------------------------------
| VisitorToken
|-------------------------------------------------------------------------------
|
| ⚠️ Client ONLY，Server 全程无需参与
|
*/

export const genVisitorToken = async (): Promise<string> => {
  if (isServer()) return '';

  const fpPromise = FingerprintJS.load();
  const fp = await fpPromise;
  const result = await fp.get();

  return result?.visitorId || '';
};

// 初始化的时候设置浏览器唯一指纹（主要用于登录时获取验证码 Captcha）
export const setCookieVisitorToken = async () => {
  const token = await genVisitorToken();
  const expires = moment().add(1, 'years').toDate();

  Cookies.set(configs.user.VISITOR_TOKEN_NAME, token, { expires });

  return token;
};

export const getCookieVisitorToken = async (): Promise<string> => {
  let visitorToken = Cookies.get(configs.user.VISITOR_TOKEN_NAME);
  if (!visitorToken) visitorToken = await setCookieVisitorToken();

  return visitorToken;
};
