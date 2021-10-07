/* eslint-disable max-len, import/no-cycle */
import { IApiCommonPage, IApiRoleItem } from '@/types/api';

export type IApiUserItem = {
  id: number; // 101
  name: string; // 'Name',
  email: string; // 'email@live.com'
  phone: string; // '186....'
  email_verified_at: null;
  status: number; // 1
  created_at: string; // '2021-03-02T03:16:37.000000Z'
  updated_at: string; // '2021-03-02T03:16:37.000000Z'
  permissions: string[]; // ['article.create', 'article.*']
  roles?: IApiRoleItem[]; // [];
};

export interface IApiUserListReq extends IApiCommonPage {
  q?: string;
  role_name?: string;
  role_id?: string;
}

export interface IApiUserItemReq {
  id?: string;
}
