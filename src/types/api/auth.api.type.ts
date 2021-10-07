/* eslint-disable max-len, import/no-cycle */
import { IApiUserItem } from '@/types/api';

export type IApiAuthMeItem = IApiUserItem;

export interface IApiAuthMeItemReq {}

export interface IApiAuthCaptchaItemReq {
  token: string;
}

export type IApiAuthCaptchaItemItem = {
  captcha: string; // 这里返回的是一个 svg <svg xmlns=....
};
