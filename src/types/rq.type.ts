import { AxiosError } from 'axios';
import { UseQueryOptions } from 'react-query';

// eslint-disable-next-line import/no-cycle
import { IApiResItemData, IApiResListData } from '@/types/api';

export interface UseQueryOptionsExt {
  disabledErrorMsg?: boolean;
  disabledSuccessMsg?: boolean;
}

// Rq Query List 列表
export type IRqListOpts<TData> = UseQueryOptions<
  //
  // TQueryFnData: 指 fetch 要返回的数据，handle 之后也算
  Promise<IApiResListData<TData> | undefined | void>,
  //
  // TError: 指 fetch 的 catch 部分
  AxiosError,
  //
  // TData: 指 const { data } = useQuery() 中的 data
  IApiResListData<TData>
> &
  UseQueryOptionsExt;

// Rq Query Item 条目
export type IRqItemOpts<TData> = UseQueryOptions<
  //
  // TQueryFnData: 指 fetch 要返回的数据，handle 之后也算
  Promise<IApiResItemData<TData> | undefined | void>,
  //
  // TError: 指 fetch 的 catch 部分
  AxiosError,
  //
  // TData: 指 const { data } = useQuery() 中的 data
  IApiResItemData<TData>
> &
  UseQueryOptionsExt;
