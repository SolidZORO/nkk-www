/* eslint-disable max-len, import/no-cycle */
import {
  IApiCategoryItem,
  IApiCommonPage,
  IApiMetadataItem,
} from '@/types/api';

export type IApiArticleItem = {
  title: string;
  content: string;
  category?: IApiCategoryItem;
  metadatas?: IApiMetadataItem[];
  status: boolean;
  //
  id: number;
  created_at: string;
  updated_at: string;
};

export interface IApiArticleListReq extends IApiCommonPage {
  q?: string;
}

export interface IApiArticleItemReq {
  id?: string;
}
