/* eslint-disable max-len, import/no-cycle */
import { IApiCommonPage } from '@/types/api';

export type IApiAttachmentItem = {
  name: string; // "m03_1x"
  alt: string; // "m03_1x"
  created_at: string; // "2021-09-19T10:07:57.000Z"
  deleted_at: string; // null
  description: string; // "m03_1x"
  ext: string; // ".png"
  filename: string; // "e561abbf-5e25-4a13-8463-dd9fc680ce8e.png"
  height: number; // 300
  id: number; // 9
  path: string; // "/attachments/2021/09/e561abbf-5e25-4a13-8463-dd9fc680ce8e.png"
  size: number; // 42499
  status: number; // 1
  thumb?: string; // "/attachments/2021/09/e561abbf-5e25-4a13-8463-dd9fc680ce8e-thumb.png"
  type: string; // "image"
  updated_at: string; // "2021-09-19T10:07:57.000Z"
  user_id?: number; // null
  width: number; // 400
};

export interface IApiAttachmentListReq extends IApiCommonPage {
  q?: string;
  order?: 'asc' | 'desc';
}

export interface IApiAttachmentItemReq {
  id?: string;
}

export interface IOssAliyunSignature {
  OSSAccessKeyId: string;
  expiration: string;
  policy: string;
  saveDirPath: string;
  signature: string;
  uploadEndPoint: string;
  // callback: string;
  callback: any;
  platform: 'aliyun';
}

export interface ILocalSignature
  extends Pick<IOssAliyunSignature, 'uploadEndPoint' | 'saveDirPath'> {
  expiration: string;
  platform: 'local';
}
