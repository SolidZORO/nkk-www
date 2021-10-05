import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { Router } from 'next/router';
import { ErrorBoundary, LoadingSpinner } from '@/components';
import { MasterLayout } from '@/layouts';
import { DISABLE_SSR_TRANSITION } from '@/pages/_document';
import { isServer } from '@/utils/env.util';
import { ILayout } from '@/types/comp.type';

// import '@/styles/rcicon.css';

require('@/styles/global.less');

Spin.setDefaultIndicator(<LoadingSpinner />);

export interface ICustomApp {
  Component: React.FC & {
    getLayout: any;
  };
  pageProps: {
    layout?: ILayout;
    name?: string;
  };
  routeProps: Router;
  err?: Error;
}

export default function CustomApp(props: ICustomApp) {
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
  }, []);

  // let layoutDom = null;

  // if (props.pageProps?.layout === 'master') {
  //   layoutDom = (
  //     <MasterLayout
  //       mainComp={props.Component}
  //       routeProps={props.routeProps}
  //       pageProps={props.pageProps}
  //     />
  //   );
  // }

  return (
    <ErrorBoundary>
      <HelmetProvider>
        {/*{layoutDom || <span />}*/}
        <MasterLayout
          mainComp={props.Component}
          routeProps={props.routeProps}
          pageProps={props.pageProps}
        />
      </HelmetProvider>
    </ErrorBoundary>
  );
}
