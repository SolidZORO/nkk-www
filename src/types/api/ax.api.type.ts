/* eslint-disable max-len, import/no-cycle */
import { IApiCommonPage } from '@/types/api';

export type IApiAxItem = {
  id: number;
  title: string;
  slug: string;
  //
  status: boolean;
  //
  start_time: string;
  end_time: string;
  //
  created_at: string;
  updated_at: string;
};

export interface IApiAxListReq extends IApiCommonPage {
  q?: string;
}

export interface IApiAxItemReq {
  id?: string;
}
