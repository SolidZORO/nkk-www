/* eslint-disable max-len, import/no-cycle */
import { IApiCommonPage } from '@/types/api';

export type IApiSettingItem = {
  key: string;
  value: string;
  //
  id: number;
  created_at: string;
  updated_at: string;
};

export type IApiSettingAllItem = {
  [key: string]: string;
};

export interface IApiSettingListReq extends IApiCommonPage {
  q?: string;
}

export interface IApiSettingItemReq {
  id?: string;
}

//

export interface IApiSettingListMut {
  [key: string]: any;
}
