import { makeAutoObservable } from 'mobx';

import { getUserPermissions } from '@/utils/user.util';

export class UserStore {
  permissions: string[] = getUserPermissions();

  constructor(initData?: { userStore?: UserStore }) {
    makeAutoObservable(this);
  }

  setPermissions(permissions: string[]) {
    this.permissions = permissions;

    return Promise.resolve(permissions);
  }
}
