import React, { useEffect } from 'react';

import { setCookieVisitorToken } from '@/utils/user.util';
import { isServer } from '@/utils/env.util';
import { DISABLE_SSR_TRANSITION } from '@/pages/_document';
import { useSmartNavigate } from '@/hooks';

interface IProps {
  children?: React.ReactNode | any;
}

export const AppGlobalEvent: React.FC<IProps> = (props) => {
  const navigate = useSmartNavigate();

  const avoidCssAnimationFlashing = () => {
    if (!isServer()) {
      const disableTransitionDom = document.getElementById(
        DISABLE_SSR_TRANSITION,
      );

      if (disableTransitionDom) disableTransitionDom.remove();
    }
  };

  useEffect(() => {
    avoidCssAnimationFlashing();
    setCookieVisitorToken();

    // 全局共享 navigate 方法（按照 react-router v6 的习惯，依然叫 navigate）
    // @ts-ignore
    window.__ROUTER_NAVIGATE__ = navigate;
  }, []);

  return props.children || null;
};
