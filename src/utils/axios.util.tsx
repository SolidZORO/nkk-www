import React from 'react';

import {
  IAxiosGetError,
  IAxiosPostError,
  IRqMutItemOpts,
  IRqQueryItemOpts,
  IRqQueryListOpts,
} from '@/types';
import { configs } from '@/configs';
import { IAxiosRawResItem, IAxiosRawResList } from '@/types/api';
import { errorMsg, errorMsgTranslate } from '@/utils/msg.util';

/*
|-------------------------------------------------------------------------------
| Fetch
|-------------------------------------------------------------------------------
|
*/

// 输入：Axios Raw Res
// 输出：Api Item `data` 字段，满足 useQuery 的用法
export function handleAxiosGetItem<TData>(
  res: IAxiosRawResItem<TData>, // Axios Raw Res
  opts?: IRqQueryItemOpts<TData>,
) {
  if (res?.data?.error) {
    console.log('🔥🔥🔥 handleQueryItem', res?.data?.message, res);

    if (!opts?.disabledErrorMsg) errorMsg(res?.data?.message);

    return undefined;
  }

  // data: { id: 1, name: 'abc' }
  return res?.data?.data;
}

// 输入：Axios Raw Res
// 输出：Api List `data` 字段，满足 useQuery 的用法
export function handleAxiosGetList<TData>(
  rawRes: IAxiosRawResList<TData[]>, // Axios Raw Res
  rqQueryOpts?: IRqQueryListOpts<TData[]>,
) {
  if (rawRes?.data?.error) {
    console.log('🔥🔥🔥 handleQueryList', rawRes?.data?.message, rawRes);

    if (!rqQueryOpts?.disabledErrorMsg) errorMsg(rawRes?.data?.message);

    return undefined;
  }

  // total: 10766
  // data: [
  //   { id: 1, name: 'abc' },
  //   { id: 2, name: 'xyz' },
  // ]
  return rawRes?.data?.data;
}

export function handleAxiosGetCatch(err: IAxiosGetError): void {
  const errMsg: string =
    // @ts-ignore
    err.response?.data?.error?.message ||
    // @ts-ignore
    err.response?.data?.message ||
    err.response?.statusText ||
    err.message ||
    configs.text.ERROR_MESSAGE;

  console.log('❌❌❌ handleQueryCatch', errMsg, err);

  errorMsg(errorMsgTranslate(errMsg));
}

/*
|-------------------------------------------------------------------------------
| Mut
|-------------------------------------------------------------------------------
|
*/

export function handleAxiosPostItem<TData, TVariables>(
  rawRes: IAxiosRawResItem<TData>, // Axios Raw Res
  opts?: IRqMutItemOpts<TData, TVariables>,
): TData | undefined {
  if (rawRes?.data?.error) {
    console.log('🔥🔥🔥 handleMutItem', rawRes?.data?.message, rawRes);

    return undefined;
  }

  return rawRes?.data?.data;
}

export function handleAxiosPostCatch(err: IAxiosPostError): void {
  const errMsg: string =
    // @ts-ignore
    err.response?.data?.error?.message ||
    // @ts-ignore
    err.response?.data?.message ||
    err.response?.statusText ||
    err.message ||
    configs.text.ERROR_MESSAGE;

  console.log('❌❌❌ HTTP-CATCH', errMsg, err);

  errorMsg(errorMsgTranslate(errMsg));
}
