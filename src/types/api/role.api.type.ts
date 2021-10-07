/* eslint-disable max-len, import/no-cycle */
import { IApiCommonPage, IApiPermissionItem } from '@/types/api';

export type IApiRoleItem = {
  id: number;
  name: string;
  alias: string;
  permissions_count?: number;
  users_count?: number;
  permissions?: IApiPermissionItem[];
  guard_name: string;
  created_at: string;
  updated_at: string;
};

export interface IApiRoleListReq extends IApiCommonPage {
  q?: string;
  roleless?: 1;
}

export interface IApiRoleItemReq {
  id?: string;
}
