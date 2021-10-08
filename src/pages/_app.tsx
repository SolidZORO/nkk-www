/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ConfigProvider as AntdConfigProvider, Spin } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { Router } from 'next/router';
import { AppContextType } from 'next/dist/shared/lib/utils';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import NextNprogress from 'nextjs-progressbar';
import zhCN from 'antd/lib/locale/zh_CN';

import { StoresProvider } from '@/stores';
import {
  AppGlobalEvent,
  AppGlobalFetch,
  ErrorBoundary,
  PageLoadingSpinner,
} from '@/components';
import { MasterLayout } from '@/layouts/MasterLayout/MasterLayout';
import { AuthLayout } from '@/layouts/AuthLayout/AuthLayout';
import { ILayout } from '@/types/comp.type';
import { configs } from '@/configs';
import { fetcher, setFetcherToken } from '@/libs';
import { AppStore } from '@/stores/app.store';
import { IApiSettingAllItem } from '@/types/api';
import { checkUserIsAvailably, getUserToken } from '@/utils/user.util';
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

Spin.setDefaultIndicator(<PageLoadingSpinner />);

export default function CustomApp(props: ICustomApp) {
  // 检查 user 登录状态，如果没有 token 会做一次 logout 动作
  if (checkUserIsAvailably({ noTokenThanRemoveUser: true })) {
    // ⚠️
    // 由于代码部分 fetch hooks 的执行速度比 AppGlobalEvent 里的 useEffect([]) 还快
    // 所以 setFetcherToken 放在这里，保证所有 fetch 都带上 token
    setFetcherToken(getUserToken());
  }

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
      <AntdConfigProvider locale={zhCN}>
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

              <NextNprogress
                color="#0006"
                startPosition={0.3}
                stopDelayMs={200}
                height={1}
                showOnShallow
                options={{
                  speed: 100,
                  showSpinner: false,
                }}
              />

              {layoutDom}
            </QueryClientProvider>
          </StoresProvider>
        </HelmetProvider>
      </AntdConfigProvider>
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
