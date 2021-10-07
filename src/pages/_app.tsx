import React from 'react';
import { Spin } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { Router } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';

import { StoresProvider } from '@/stores';
import {
  AppGlobalEvent,
  AppGlobalFetch,
  ErrorBoundary,
  LoadingSpinner,
} from '@/components';
import { MasterLayout } from '@/layouts/MasterLayout/MasterLayout';
import { AuthLayout } from '@/layouts/AuthLayout/AuthLayout';
import { ILayout } from '@/types/comp.type';
import { configs } from '@/configs';
import { fetcher } from '@/libs';
import { AppStore } from '@/stores/app.store';
import { IApiSettingAllItem } from '@/types/api';

require('@/styles/global.less');

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

export interface ICustomApp {
  Component: React.FC & {
    getLayout: any;
  };
  pageProps: {
    layout?: ILayout;
    name?: string;
  };
  routeProps: Router;
  router: Router;
  err?: Error;
}

Spin.setDefaultIndicator(<LoadingSpinner />);

export default function CustomApp(props: ICustomApp) {
  // 默认 Master
  let layoutDom = (
    <MasterLayout
      mainComp={props.Component}
      routeProps={props.routeProps}
      pageProps={props.pageProps}
    />
  );

  // 遇到个别属于 auth 的 login/register 要走 auth
  if (['/login', '/register'].includes(props.router.pathname)) {
    layoutDom = (
      <AuthLayout
        mainComp={props.Component}
        routeProps={props.routeProps}
        pageProps={props.pageProps}
      />
    );
  }

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <StoresProvider {...props.pageProps}>
          <QueryClientProvider client={queryClient}>
            <AppGlobalFetch />
            <AppGlobalEvent />

            {layoutDom || <span />}
          </QueryClientProvider>
        </StoresProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

CustomApp.getInitialProps = async () => {
  const apiUrl = `${configs.url.API_URL}/settings/all`;

  const settingsRes: {
    data: { data: IApiSettingAllItem };
  } = await fetcher.get(apiUrl);

  if (!settingsRes?.data?.data) return {};

  return {
    pageProps: {
      initState: {
        appStore: {
          setting: settingsRes.data.data,
        } as Partial<AppStore>,
      },
    },
  };
};
