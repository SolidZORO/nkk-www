/* eslint-disable max-len, import/no-cycle */
import { AxiosResponse } from 'axios';

export interface IApiCommonError {
  error: number;
  message: string;
}

export interface IApiCommonPage {
  page?: number; // 1 当前请求页码
  page_size?: number; // 10 请求条数
}

/**
 * List 列表， e.g.
 *
 * statusCode: 200
 * message: "请求成功"
 * data: {
 *   page: 1
 *   page_size: 20
 *   total: 10766
 *   data: [
 *     { id: 1, name: "sa" },
 *     { id: 2, name: "admin" },
 *   ]
 * }
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

// @ts-ignore
export interface IFetcherResList<T> extends AxiosResponse {
  // 一共 3 层 data
  data: IApiResList<T>;
  statusText: string; // ⚠️ 这是 Axios Raw，特地写了一个 Raw 的字段在这边
}

/**
 * Item 条目， e.g.
 *
 * statusCode: 200
 * message: "请求成功"
 * data: {
 *   id: 1, name: "sa"
 * }
 */
export type IApiResItemData<T> = T;

export interface IApiResItem<T> {
  // 一共 2 层 data
  data: IApiResItemData<T>;
  message: string;
  statusCode: number;
  error?: number;
}

// @ts-ignore
export interface IFetcherResItem<T> extends AxiosResponse {
  // 没错，就是 2 层 data
  data: IApiResItem<T>;
  statusText: string; // ⚠️ 这是 Axios Raw，特地写了一个 Raw 的字段在这边
}
