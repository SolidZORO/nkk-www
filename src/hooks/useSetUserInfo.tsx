import _ from 'lodash';
import { useAtom } from 'jotai';

import { userStore } from '@/stores';
import { IAuthUser } from '@/types';
import { configs } from '@/configs';
import { clearAxiosToken } from '@/libs/axios.lib';
import { useSmartNavigate } from '@/hooks';
import {
  checkCookieUserIsAvailably,
  clearCookieUser,
  setCookieUserInfo,
  setCookieUserToken,
} from '@/utils/user.util';

export const useSetUserInfo = () => {
  const [token, _setToken] = useAtom(userStore.token);
  const [tokenExpiresIn, _setTokenExpiresIn] = useAtom(
    userStore.tokenExpiresIn,
  );
  const [permissions, _setPermissions] = useAtom(userStore.permissions);
  const [userInfo, _setUserInfo] = useAtom(userStore.userInfo);

  const navigate = useSmartNavigate();

  const setUserToken = (t: string, expIn: string) => {
    _setToken(t);
    _setTokenExpiresIn(expIn);

    setCookieUserToken(t, expIn);
  };

  // store 操作完后需要给 util 也操作一下，因为 login 那边统一用 store 的 fn
  const setUserPermissions = (pms: string[]) => {
    _setPermissions(pms);

    return Promise.resolve(permissions);
  };
  const setUserInfo = (info: Partial<IAuthUser> | null) => {
    _setUserInfo(info);
    setCookieUserInfo(info);
  };

  const clearUser = () => {
    setUserPermissions([]);
    setUserToken('', '');
    setUserInfo(null);

    clearAxiosToken();
    clearCookieUser();
  };

  const checkUserIsAvailably = () => {
    return checkCookieUserIsAvailably({ token, tokenExpiresIn });
  };

  const can = (permissionName?: any) => {
    if (!permissionName || !userInfo) return false;
    if (!permissions || _.isEmpty(permissions)) return false;

    return permissions.includes(permissionName);
  };

  const logoutUserAndNavigateToLogin = () => {
    clearUser();

    navigate(configs.url.LOGIN);
  };

  return {
    token,
    setUserToken,
    permissions,
    setUserPermissions,
    userInfo,
    setUserInfo,
    clearUser,
    logoutUserAndNavigateToLogin,
    //
    checkUserIsAvailably,
    can,
  };
};
