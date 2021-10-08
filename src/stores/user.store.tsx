import { makeAutoObservable } from 'mobx';

import {
  checkUserIsAvailably,
  getUserInfo,
  removeUser,
  setUserInfo,
  setUserToken,
} from '@/utils/user.util';
import { IAuthUser } from '@/types';

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
      const userInfo = getUserInfo({
        // @ts-ignore
        userInfoStr: initData.userStore.userInfoStr,
      });

      this.setUserInfo(userInfo);
      this.setPermissions(userInfo?.permissions);
    }
  }

  checkUserIsAvailably() {
    return checkUserIsAvailably({
      token: this.token,
      tokenExpiresIn: this.tokenExpiresIn,
    });
  }

  // store 操作完后需要给 util 也操作一下，因为 login 那边统一用 store 的 fn

  setPermissions(permissions: string[]) {
    this.permissions = permissions;

    return Promise.resolve(permissions);
  }

  removeUser() {
    this.permissions = [];
    this.token = '';
    this.tokenExpiresIn = '';
    this.userInfo = null;

    removeUser();
  }

  setUserInfo(userInfo: Partial<IAuthUser>) {
    this.userInfo = userInfo;

    setUserInfo(userInfo);
  }

  setUserToken(token: string, expiresIn: string) {
    this.token = token;
    this.tokenExpiresIn = expiresIn;

    setUserToken(token, expiresIn);
  }
}
