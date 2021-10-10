/* eslint-disable max-len, import/no-cycle */
import { IApiUserItem } from '@/types/api/user.api.type';

export type IAuthUser = IApiUserItem;

export type ILoginReq = {
  account: string; // email or phone
  password: string;
  token?: string; // visitorToken
  captcha?: string;
};

export type ILoginRes = {
  user: IApiUserItem;
  token: string;
  tokenExpiresIn: string;
};




export type IJoinReq = {
  account: string; // email or phone
  password: string;
};

export type IJoinRes = {
  user: IApiUserItem;
  token: string;
  tokenExpiresIn: string;
};
