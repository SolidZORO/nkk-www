import React from 'react';
import { message } from 'antd';
import {
  RiBearSmileLine,
  RiErrorWarningLine,
  RiLoader4Line,
} from 'react-icons/ri';
import { configs } from '@/configs';
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
