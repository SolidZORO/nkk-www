import { makeAutoObservable } from 'mobx';

import { IApiSettingAllItem } from '@/types/api';

export class AppStore {
  setting: IApiSettingAllItem = {};

  constructor(initData?: { appStore?: AppStore }) {
    makeAutoObservable(this);

    if (initData?.appStore?.setting) {
      this.setSetting(initData.appStore.setting);
    }
  }

  setSetting = (data?: IApiSettingAllItem) => {
    if (!data) return;

    this.setting = data;
  };
}
