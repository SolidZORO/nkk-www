/* eslint-disable max-len, import/no-cycle */
import { IApiCommonPage } from '@/types/api';

export type IApiCategoryItem = {
  id: number;
  name: string;
  slug?: string;
  status: boolean;
  parent_id?: number;
  children?: IApiCategoryItem[];
  created_at: string;
  updated_at: string;
};

export interface IApiCategoryListReq extends IApiCommonPage {
  root_id?: string;
  root_slug?: string;
}

export interface IApiCategoryItemReq {
  id?: string;
}
