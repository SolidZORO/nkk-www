import React from 'react';
import { message } from 'antd';
import {
  RiBearSmileLine,
  RiErrorWarningLine,
  RiLoader4Line,
} from 'react-icons/ri';

import { IFetcherError, IMutError, IRqItemOpts, IRqListOpts } from '@/types';
import { configs } from '@/configs';
import { IFetcherResItem, IFetcherResList } from '@/types/api';
import { isServer } from '@/utils/env.util';

export declare type IToastType =
  | 'info'
  | 'success'
  | 'error'
  | 'warning'
  | 'loading'
  | 'text';

export interface IToastOpts {
  type: IToastType;
  icon?: any;
  duration?: number;
  maxCount?: number;
  transitionName?: string;
}

// 供内部 msg 和 errorMsg 调用，不暴露在外面
function _toast(text: React.ReactNode | string, opts: IToastOpts): void {
  if (isServer()) return;

  const DEFAULT_OPTS = {
    // type: 'success',
    icon: <span />,
    // icon: <SsSuccess />,
    duration: 2,
    // duration: 20000,
    // maxCount: 10,
    maxCount: 1,
  };

  const nextOpts: IToastOpts = {
    ...DEFAULT_OPTS,
    ...opts,
  };

  // console.log(nextOpts);

  if (['error', 'info', 'warning'].includes(nextOpts?.type)) {
    nextOpts.icon = <RiErrorWarningLine />;
  }

  if (nextOpts?.type === 'success') {
    nextOpts.icon = <RiBearSmileLine />;
  }

  if (nextOpts?.type === 'loading') {
    nextOpts.icon = <RiLoader4Line className="g-icon-spin" />;
  }

  if (nextOpts?.type === 'text') {
    nextOpts.icon = <span />;
  }

  message.config({
    duration: nextOpts.duration,
    prefixCls: `ant-toast ant-toast-type--${opts?.type} ant-message`,
    // https://github.com/ant-design/ant-design/issues/16435#issuecomment-792425958
    // 目前所有动画都必须加上 ant- 前缀，否则无法关闭
    transitionName: 'ant-zoom',
    maxCount: nextOpts.maxCount,
  });

  const nextText = text || configs.text.SUCCESS_MESSAGE;

  // if (isOffline()) {
  //   nextText = configs.text.ERROR_MESSAGE_OFFLINE;
  // }

  message.info({
    icon: <em>{nextOpts.icon || null}</em>,
    content: nextText,
  });
}

export function errorMsgTranslate(text?: string): string {
  if (!text) return '未知错误';

  const lowerText = text.toLocaleLowerCase();
  let nextText = '';

  if (lowerText.includes('cannot read property')) nextText = '网络错误';
  if (lowerText.includes('timeout of')) nextText = '网络超时';
  if (lowerText.includes('network error')) nextText = '网络错误';

  // if (isOffline()) nextText = configs.text.ERROR_MESSAGE_OFFLINE;

  return nextText || text;
}

export function msg(
  text?: React.ReactNode | string,
  params?: { type?: 'error' | string; duration?: number },
) {
  if (isServer()) return;

  message.config({ prefixCls: 'ant-message' });
  message.config({ prefixCls: 'ant-message', duration: params?.duration });

  if (params?.type === 'error') {
    message.error(text || 'Error');
    return;
  }

  // eslint-disable-next-line consistent-return
  return Promise.resolve(message.success(text || 'Success'));
}

export function errorMsg(text?: React.ReactNode | string): void {
  msg(text, { type: 'error' });
}

/**
 * 输入：Axios Raw Res
 * 输出：Api Item `data` 字段，满足 useQuery 的用法
 */
export function handleFetchItem<TData>(
  res: IFetcherResItem<TData>, // Axios Raw Res
  opts?: IRqItemOpts<TData>,
) {
  if (res?.data?.error) {
    console.log('🔥🔥🔥 HTTP-ITEM-ERROR', res?.data?.message, res);

    if (!opts?.disabledErrorMsg) errorMsg(res?.data?.message);

    return undefined;
  }

  // data: { id: 1, name: 'abc' }
  return res?.data?.data;
}

/**
 * 输入：Axios Raw Res
 * 输出：Api List `data` 字段，满足 useQuery 的用法
 */
export function handleFetchList<TData>(
  rawRes: IFetcherResList<TData[]>, // Axios Raw Res
  rqOpts?: IRqListOpts<TData[]>,
) {
  if (rawRes?.data?.error) {
    console.log('🔥🔥🔥 HTTP-LIST-ERROR', rawRes?.data?.message, rawRes);

    if (!rqOpts?.disabledErrorMsg) errorMsg(rawRes?.data?.message);

    return undefined;
  }

  // total: 10766
  // data: [
  //   { id: 1, name: 'abc' },
  //   { id: 2, name: 'xyz' },
  // ]
  return rawRes?.data?.data;
}

export function handleFetchCatch(err: IFetcherError): void {
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

//
//
//
//

/**
 * 输入：Axios Raw Mut
 * 输出：Api Item `data` 字段，满足 useMutation 的用法
 */
export function handleMutItem<TData>(
  res: IFetcherResItem<TData>, // Axios Raw Res
  opts?: IRqItemOpts<TData>,
) {
  if (res?.data?.error) {
    console.log('🔥🔥🔥 HTTP-ITEM-ERROR', res?.data?.message, res);

    // if (!opts?.disabledErrorMsg) errorMsg(res?.data?.message);

    return undefined;
  }

  // if (!opts?.disabledSuccessMsg) msg(res?.data?.message);

  // data: { id: 1, name: 'abc' }
  return res?.data?.data;
}

export function handleMutCatch(err: IMutError): void {
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
