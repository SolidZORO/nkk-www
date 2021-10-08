import React from 'react';
import { Spin } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { Router } from 'next/router';
import { NextPageContext } from 'next';
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
import { __env__, configs } from '@/configs';
import { fetcher } from '@/libs';
import { AppStore } from '@/stores/app.store';
import { IApiSettingAllItem } from '@/types/api';
import { AppContextType } from 'next/dist/shared/lib/utils';

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
    initState: any;
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
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
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

CustomApp.getInitialProps = async ({ ctx }: AppContextType) => {
  // 这里试验性的使用 Next.js 自带的 API（Server 需要从 req 里面找到 host，Client 不用）
  // const apiUrl = `${configs.url.API_URL}/settings/all`;

  let httpProtocol;
  if (ctx?.req?.headers?.host?.includes('localhost')) httpProtocol = 'http';
  else httpProtocol = 'https';

  // eslint-disable-next-line max-len
  const apiUrl = `${httpProtocol}://${ctx?.req?.headers?.host}/${__env__.NEXT_PUBLIC_API_BASE_URL}/settings/all`;

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
