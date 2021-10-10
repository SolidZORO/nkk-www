import { AxiosError } from 'axios';
import { UseMutationOptions, UseQueryOptions } from 'react-query';

// eslint-disable-next-line import/no-cycle
import { IApiResItemData, IApiResListData } from '@/types/api';

/*
|-------------------------------------------------------------------------------
| Query
|-------------------------------------------------------------------------------
|
*/

export interface IRqUseQueryOptionsExt {
  disabledErrorMsg?: boolean;
  disabledSuccessMsg?: boolean;
}

// Query List
export type IRqQueryListOpts<TData, TQueryKey = any> = UseQueryOptions<
  Promise<IApiResListData<TData> | undefined | void>, // axios 要返回的数据，handle 之后也算
  AxiosError,
  IApiResListData<TData>, // <--- 这里是 List
  [string, TQueryKey] // 对应 useQuery 的 [apiUrl, params]
> &
  IRqUseQueryOptionsExt;

// Query Item
export type IRqQueryItemOpts<TData, TQueryKey = any> = UseQueryOptions<
  Promise<IApiResItemData<TData> | undefined | void>,
  AxiosError,
  IApiResItemData<TData>, // <--- 这里是 Item
  [string, TQueryKey]
> &
  IRqUseQueryOptionsExt;

/*
|-------------------------------------------------------------------------------
| Mut
|-------------------------------------------------------------------------------
|
*/

export interface IRqUseMutationOptionsExt {
  disabledErrorMsg?: boolean;
  disabledSuccessMsg?: boolean;
}

// Mut List（Mut 都是 Item，没有 List）

// Mut Item
export type IRqMutItemOpts<TData, TVariables = void> = UseMutationOptions<
  TData | undefined | void, // Query 有区别，Axios 返回什么就用什么
  AxiosError,
  TVariables // 这其实是 .post() 的 data
> &
  IRqUseMutationOptionsExt;
