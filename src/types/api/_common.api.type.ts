/* eslint-disable max-len, import/no-cycle */
import { AxiosResponse } from 'axios';

export interface IApiResCommonError {
  error: number;
  message: string;
}

export interface IApiCommonPage {
  page?: number; // 1 当前请求页码
  page_size?: number; // 10 请求条数
}

// ⚠️ TODO 目前 axios never 有问题，这里强制改写成 unknown，作者会在 v0.23 修复这个问题
// https://github.com/axios/axios/issues/4141
// https://github.com/axios/axios/pull/4142/files

/*
|-------------------------------------------------------------------------------
| List
|-------------------------------------------------------------------------------
|
| List 是 3 层 data，里面的 data 就是 List 的内容，List 里面还包含 data 和分页等信息
|
| statusCode: 200
| message: "请求成功"
| data: {
|   page: 1
|   page_size: 20
|   total: 10766
|   data: [
|     { id: 1, name: "sa" },
|     { id: 2, name: "admin" },
|   ]
| }
|
*/

export interface IApiResListData<T> {
  page: number;
  page_size: number;
  total: number;
  data: T; // 上游必须显式传入是 `T` 还是 `T[]`
}

export interface IApiResList<T> {
  data: IApiResListData<T>;
  message: string;
  statusCode: number;
  error?: number;
}

export interface IAxiosRawResList<T> extends AxiosResponse<unknown> {
  data: IApiResList<T>;
  statusText: string; // ⚠️ 这层是 Axios Raw，特地 Copy 了一个 Raw 的字段在这边
}

/*
|-------------------------------------------------------------------------------
| Item
|-------------------------------------------------------------------------------
|
| Item 是 2 层 data，里面的 data 就是 Item 的内容
|
| statusCode: 200
| message: "请求成功"
| data: {
|   id: 1, name: "sa"
| }
|
*/

export type IApiResItemData<T> = T;

export interface IApiResItem<T> {
  data: IApiResItemData<T>;
  message: string;
  statusCode: number;
  error?: number;
}

export interface IAxiosRawResItem<T> extends AxiosResponse<unknown> {
  data: IApiResItem<T>;
  statusText: string; // ⚠️ 这层是 Axios Raw，特地 Copy 了一个 Raw 的字段在这边
}
