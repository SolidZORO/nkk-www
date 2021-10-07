import { makeAutoObservable } from 'mobx';

import { IApiSettingAllItem } from '@/types/api';

export class AppStore {
  setting: IApiSettingAllItem = {};

  constructor(initData?: { appStore?: AppStore }) {
    // console.log('initData >>>>', initData);
    makeAutoObservable(this);

    // hydrate
    if (initData?.appStore?.setting) {
      this.setSetting(initData.appStore.setting);
    }
  }

  //
  // @action
  setSetting = (data?: IApiSettingAllItem) => {
    if (!data) return;

    this.setting = data;
  };
}
