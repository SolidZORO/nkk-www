import _ from 'lodash';
import { makeAutoObservable } from 'mobx';

import { IAuthUser } from '@/types';
import {
  checkCookieUserIsAvailably,
  getCookieUserInfo,
  clearCookieUser,
  setCookieUserInfo,
  setCookieUserToken,
} from '@/utils/user.util';

export class UserStore {
  permissions: string[] = [];
  token: string = '';
  tokenExpiresIn: string = '';
  userInfo: any = null;

  constructor(initData?: { userStore?: UserStore }) {
    makeAutoObservable(this);

    if (initData?.userStore?.token || initData?.userStore?.tokenExpiresIn) {
      this.setUserToken(
        initData.userStore.token,
        initData.userStore.tokenExpiresIn,
      );
    }

    // @ts-ignore 这里故意传了一个 Str 后缀的
    if (initData?.userStore?.userInfoStr) {
      const userInfo = getCookieUserInfo({
        // @ts-ignore
        userInfoStr: initData.userStore.userInfoStr,
      });

      this.setUserInfo(userInfo);
      this.setPermissions(userInfo?.permissions);
    }
  }

  checkUserIsAvailably() {
    return checkCookieUserIsAvailably({
      token: this.token,
      tokenExpiresIn: this.tokenExpiresIn,
    });
  }

  // store 操作完后需要给 util 也操作一下，因为 login 那边统一用 store 的 fn

  setPermissions(permissions: string[]) {
    this.permissions = permissions;

    return Promise.resolve(permissions);
  }

  clearUser() {
    this.permissions = [];
    this.token = '';
    this.tokenExpiresIn = '';
    this.userInfo = null;

    clearCookieUser();
  }

  setUserInfo(userInfo: Partial<IAuthUser>) {
    this.userInfo = userInfo;

    setCookieUserInfo(userInfo);
  }

  setUserToken(token: string, expiresIn: string) {
    this.token = token;
    this.tokenExpiresIn = expiresIn;

    setCookieUserToken(token, expiresIn);
  }

  can(permissionName?: any) {
    if (!permissionName || !this.userInfo) return false;
    if (!this.permissions || _.isEmpty(this.permissions)) return false;

    return this.permissions.includes(permissionName);
  }
}
