/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Spin } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { Router } from 'next/router';
import { AppContextType } from 'next/dist/shared/lib/utils';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

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
import { isServer } from '@/utils/env.util';

require('@/styles/global.less');

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

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

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
            {configs.app.__DEV__ ? (
              <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-right"
              />
            ) : null}

            <AppGlobalFetch initState={props.pageProps?.initState} />
            <AppGlobalEvent />

            {layoutDom}
          </QueryClientProvider>
        </StoresProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

// Server 在「页面刷新后」执行（一次）
// Client 在「路由切换后」执行（多次）
CustomApp.getInitialProps = async (app: AppContextType) => {
  // 这里试验性的使用 Next.js 自带的 API（Server 需要从 req 里面找到 host，Client 不用）
  // const apiUrl = `${configs.url.API_URL}/settings/all`;

  // 在 Client 不执行
  if (!isServer()) return {};

  const host = app?.ctx?.req?.headers?.host || '';
  const protocol =
    host?.includes('localhost') || host?.includes('192.168') ? 'http' : 'https';

  // eslint-disable-next-line max-len
  const apiUrl = `${protocol}://${app?.ctx?.req?.headers?.host}/api/settings/all`;

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
