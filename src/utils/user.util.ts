import _ from 'lodash';
import moment from 'moment';
import Cookies from 'js-cookie';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import { configs } from '@/configs';
import { IAuthUser } from '@/types';
import { errorMsg, handleFetchCatch } from '@/utils/msg.util';
// eslint-disable-next-line import/no-cycle
import { fetcher } from '@/libs';
import { IFetcherResItem } from '@/types/api';
import { isServer } from '@/utils/env.util';

//
//
//
// User Token (cookie)
export const getUserToken = (
  opts: { onlyToken?: boolean; token?: string | null } = {
    onlyToken: false,
    token: null,
  },
): string => {
  // 这里直接传 token 感觉比较奇怪，其实是在 _app.ts 初始化 store 时，
  // 还没办法使用 userStore 的解决方案
  const userToken = opts?.token || Cookies.get(configs.user.USER_TOKEN_NAME);

  if (!userToken) {
    // console.log('🔑 Not Found Token');
    return '';
  }

  if (userToken && opts?.onlyToken) return userToken.replace(/^Bearer\s/, '');

  return userToken;
};

export const setUserToken = (token: string, expiresIn: string) => {
  if (!token || !expiresIn) {
    errorMsg('Auth Token Error');
    return;
  }

  const expires = moment(expiresIn).toDate();

  Cookies.set(configs.user.USER_TOKEN_NAME, token, { expires });
  Cookies.set(configs.user.USER_TOKEN_EXPIRES_IN_NAME, expiresIn, { expires });
};

export const removeUserToken = (): boolean => {
  if (!getUserToken) return false;

  Cookies.remove(configs.user.USER_TOKEN_NAME);

  return true;
};

//
//
//
// User Token Expires In (cookie)
export const getUserTokenExpiresIn = (): string | undefined => {
  const userTokenExpiresIn = Cookies.get(
    configs.user.USER_TOKEN_EXPIRES_IN_NAME,
  );

  return !userTokenExpiresIn ? undefined : userTokenExpiresIn;
};

export const removeUserTokenExpiresIn = (): boolean => {
  Cookies.remove(configs.user.USER_TOKEN_EXPIRES_IN_NAME);

  return true;
};

//
//
//
//
// User Info
export const getUserInfo = (opts?: {
  userInfoStr?: string;
}): Required<IAuthUser> => {
  const nextInfo: Partial<IAuthUser> = {
    id: 0,
    email: '',
    phone: '',
    name: '',
  };

  // const userInfo = localStorage.getItem(configs.user.USER_INFO_NAME);
  const userInfo =
    opts?.userInfoStr || Cookies.get(configs.user.USER_INFO_NAME);

  return userInfo
    ? {
        ...nextInfo,
        ...JSON.parse(userInfo),
      }
    : nextInfo;
};

export const setUserInfo = (info: Partial<IAuthUser>) => {
  // if (isServer()) return;

  if (!info) {
    errorMsg('User Info Error');
    return;
  }

  const expires = moment().add(10, 'years').toDate();

  // localStorage.setItem(configs.user.USER_INFO_NAME, JSON.stringify(info));
  Cookies.set(configs.user.USER_INFO_NAME, JSON.stringify(info), { expires });
};

export const removeUserInfo = (): boolean => {
  if (!getUserInfo()) return false;

  // localStorage.removeItem(configs.user.USER_INFO_NAME);
  Cookies.remove(configs.user.USER_INFO_NAME);

  return true;
};

//
//
//
// User Remove Fn Sets.
export const removeUser = (): boolean => {
  const removedUserInfo = removeUserInfo();
  const removedUserToken = removeUserToken();
  const removedUserTokenExpiresIn = removeUserTokenExpiresIn();

  return removedUserToken && removedUserTokenExpiresIn && removedUserInfo;
};

//
//
//
// User Tools
export const checkUserIsAvailably = (opts?: {
  // noTokenThanRemoveUser: boolean;
  token?: string;
  tokenExpiresIn?: string;
}): boolean => {
  // 这里直接传 token 感觉比较奇怪，其实是在 _app.ts 初始化 store 时，
  // 还没办法使用 userStore 的解决方案
  if (opts?.token) return true;

  const userToken = opts?.token || getUserToken();
  // const userInfo = getUserInfo();
  const userTokenExpiresIn = opts?.tokenExpiresIn || getUserTokenExpiresIn();
  const expired = moment().isAfter(userTokenExpiresIn);

  if (!userToken || !userTokenExpiresIn) {
    return false;
  }

  if (userToken && expired) {
    errorMsg('Token Expired');
  }

  if (!userToken || expired) {
    removeUser();

    return false;
  }

  return true;
};

export const refreshUserInfoByApi = (): Promise<IAuthUser> =>
  new Promise((resolve) => {
    fetcher
      .get<any, IFetcherResItem<IAuthUser>>(`${configs.url.API_URL}/auth/me`)
      .then((res) => {
        if (!res?.data?.data) {
          console.error('setUserInfoFromApi', res);

          errorMsg('获取用户信息失败');
          return;
          // reject();
        }

        const info = res.data.data;
        if (info) setUserInfo(info);

        resolve(info);
      })
      .catch(handleFetchCatch);
  });

export const getDiffPermissions = (oldPms: string[], newPms: string[]) => {
  if (!newPms) return false;

  if (!_.isEqual(oldPms, newPms)) {
    // 如果两次权限不一样，需要传新的 pms 出去
    return newPms;
  }

  return false;
};

export const can = (permissionName: any): boolean => {
  if (isServer()) return false;

  const userInfoString = localStorage.getItem(configs.user.USER_INFO_NAME);

  if (!userInfoString || !permissionName) return false;

  let userInfo: IAuthUser;

  try {
    userInfo = JSON.parse(userInfoString);
  } catch (err) {
    console.error(err);

    return false;
  }

  if (!userInfo) return false;
  if (!userInfo.permissions || _.isEmpty(userInfo.permissions)) return false;

  return userInfo.permissions.includes(permissionName);
};

//
//
//
// VisitorToken （Server 全程无需参与！Client ONLY）
export const genVisitorToken = async (): Promise<string> => {
  if (isServer()) return '';

  const fpPromise = FingerprintJS.load();
  const fp = await fpPromise;
  const result = await fp.get();

  return result?.visitorId || '';
};

// 初始化的时候设置浏览器唯一指纹（主要用于登录时获取验证码 Captcha）
// 在 App 中使用
export const setVisitorToken = async () => {
  const token = await genVisitorToken();
  const expires = moment().add(1, 'years').toDate();

  Cookies.set(configs.user.VISITOR_TOKEN_NAME, token, {
    expires,
  });

  return token;
};

// 初始化的时候设置浏览器唯一指纹（主要用于登录时获取验证码 Captcha）
export const getVisitorToken = async (): Promise<string> => {
  let visitorToken = Cookies.get(configs.user.VISITOR_TOKEN_NAME);

  if (!visitorToken) {
    visitorToken = await setVisitorToken();
  }

  return visitorToken;
};
