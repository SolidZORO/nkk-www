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
import { errorMsg, errorMsgTranslate, msg } from '@/utils/msg.util';

/*
|-------------------------------------------------------------------------------
| Get
|-------------------------------------------------------------------------------
|
*/

// 输入：Axios Raw Res
// 输出：Api Item `data` 字段，满足 useQuery 的用法
export function handleAxiosGetItem<TData>(
  rawRes: IAxiosRawResItem<TData>, // Axios Raw Res
  opts?: IRqQueryItemOpts<TData>,
) {
  if (rawRes?.data?.error) {
    console.log('🔥🔥🔥 handleAxiosGetItem ERR', rawRes?.data?.message, rawRes);

    if (!opts?.disabledErrorMsg) errorMsg(rawRes?.data?.message);

    return undefined;
  }

  // data: { id: 1, name: 'abc' }
  return rawRes?.data?.data;
}

// 输入：Axios Raw Res
// 输出：Api List `data` 字段，满足 useQuery 的用法
export function handleAxiosGetList<TData>(
  rawRes: IAxiosRawResList<TData[]>, // Axios Raw Res
  rqQueryOpts?: IRqQueryListOpts<TData[]>,
) {
  if (rawRes?.data?.error) {
    console.log('🔥🔥🔥 handleAxiosGetList ERR', rawRes?.data?.message, rawRes);

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
| Post
|-------------------------------------------------------------------------------
|
*/

export function handleAxiosPostItem<TData, TVariables>(
  rawRes: IAxiosRawResItem<TData>, // Axios Raw Res
  opts?: IRqMutItemOpts<TData, TVariables>,
): TData | undefined {
  if (rawRes?.data?.error) {
    console.log(
      '🔥🔥🔥 handleAxiosPostItem ERR',
      rawRes?.data?.message,
      rawRes,
    );
    if (!opts?.disabledErrorMsg) errorMsg(rawRes?.data?.message);

    return undefined;
  }

  if (!opts?.disabledSuccessMsg) msg(rawRes?.data?.message);

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
