/* eslint-disable max-len, import/no-cycle */
import { IApiAttachmentItem, IApiCommonPage } from '@/types/api';
import { MODULE_NAME } from '@/consts/metadata.const';

export type IApiMetadataItem = {
  id: number; // 2
  module_id: number; // 1
  module_name: string; // "ax"
  target_name: string; // "tar"
  sort: number; // 0
  status: number; // 1
  //
  title?: string; // "182"
  description?: string; // "22323"
  link?: string; // ""
  attachment_id?: number; // 17
  attachment?: IApiAttachmentItem;
  created_at?: string; // "2021-09-20T07:32:24.000Z"
  deleted_at?: string; // null
};

export interface IApiMetadataListReq extends IApiCommonPage {
  q?: string;
}

export interface IApiMetadataItemReq {
  module_name?: MODULE_NAME | string;
  module_id?: number;
  target_name?: string;
}
