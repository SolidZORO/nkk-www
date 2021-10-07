import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { setVisitorToken } from '@/utils/user.util';
import { isServer } from '@/utils/env.util';
import { DISABLE_SSR_TRANSITION } from '@/pages/_document';

interface IProps {
  children?: React.ReactNode | any;
}

// eslint-disable-next-line import/no-mutable-exports
let AppGlobalEvent: React.FC<IProps> = (props) => {
  const router = useRouter();

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
    setVisitorToken();

    // 全局共享 history 方法（按照 react-router 的习惯，依然叫 history）
    window.__ROUTER_HISTORY__ = router;
  }, []);

  return props.children || null;
};

AppGlobalEvent = observer(AppGlobalEvent);
export { AppGlobalEvent };
