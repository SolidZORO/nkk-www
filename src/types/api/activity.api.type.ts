/* eslint-disable max-len, import/no-cycle */
import { IApiCommonPage } from '@/types/api';

export type IActivityProperties = {
  attributes?: any;
  old?: any;
};

export type IApiActivityItem = {
  log_name: string; // default
  description: 'created' | 'updated' | 'deleted' | 'bulk-create';
  subject_type: string; // App\Models\User
  subject_id: string; // 1111
  causer_type: string; // App\Models\User
  causer_id: string; // 3333
  // {"old": {"note": 111}, "attributes": {"note": null}}
  properties?: IActivityProperties;
  //
  id: number;
  created_at: string;
  updated_at: string;
};

export interface IApiActivitieListReq extends IApiCommonPage {
  q?: string;
}

export interface IApiActivitieItemReq {}
