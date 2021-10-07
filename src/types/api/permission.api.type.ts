/* eslint-disable max-len, import/no-cycle */
import { IApiCommonPage } from '@/types/api';

export type IApiPermissionItem = {
  id: number;
  name: string;
  alias: string;
  guard_name: string;
  created_at: string;
  group_name?: string; // VR Field
  updated_at: string;
};

export interface IApiPermissionListReq extends IApiCommonPage {
  q?: string;
}

export interface IApiPermissionItemReq {
  id?: string;
}
