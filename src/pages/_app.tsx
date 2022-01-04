/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Router } from 'next/router';
import NextNprogress from 'nextjs-progressbar';
import { ConfigProvider as AntdConfigProvider, Spin } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useHydrateAtoms } from 'jotai/utils';
import { appWithTranslation } from 'next-i18next';

import { ReactQueryDevtools } from 'react-query/devtools';
import zhCN from 'antd/lib/locale/zh_CN';

import { appStore, userStore } from '@/stores';
import { MasterLayout } from '@/layouts/MasterLayout/MasterLayout';
import { AuthLayout } from '@/layouts/AuthLayout/AuthLayout';
import { ILayout } from '@/types/comp.type';
import { configs } from '@/configs';
import { clearAxiosToken, setAxiosToken } from '@/libs/axios.lib';
import { IApiSettingAllItem, IApiUserItem } from '@/types/api';
import { isServer } from '@/utils/env.util';
import {
  AppGlobalEvent,
  AppGlobalFetch,
  ErrorBoundary,
  PageLoadingSpinner,
} from '@/components';
import {
  checkCookieUserIsAvailably,
  clearCookieUser,
  getCookieUserToken,
} from '@/utils/user.util';

require('@/styles/global.less');
require('@/styles/global-lib.less');

export interface IInitState {
  appStore?: {
    setting?: Partial<IApiSettingAllItem>;
  };
  userStore?: {
    token?: string;
    tokenExpiresIn?: string;
    permissions?: string[];
    userInfo?: Partial<IApiUserItem>;
  };
}

export interface IPageProps {
  layout?: ILayout;
  name?: string;
  initState: IInitState;
}

export interface ICustomApp {
  Component: React.FC & {
    getLayout: any;
  };
  pageProps: IPageProps;
  routeProps: Router;
  router: Router;
  err?: Error;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

// @ts-ignore
if (!isServer()) window.__CONFIGS__ = configs;

Spin.setDefaultIndicator(<PageLoadingSpinner />);

const CustomApp = (props: ICustomApp) => {
  // initState from _getServerSideProps.ts
  const initState = props?.pageProps?.initState;

  const hydrate = [
    [appStore.setting, initState?.appStore?.setting],
    //
    [userStore.token, initState?.userStore?.token],
    [userStore.tokenExpiresIn, initState?.userStore?.tokenExpiresIn],
    [userStore.permissions, initState?.userStore?.permissions],
    [userStore.userInfo, initState?.userStore?.userInfo],
  ];

  useHydrateAtoms(hydrate as any);

  if (
    !checkCookieUserIsAvailably({
      token: initState?.userStore?.token,
      tokenExpiresIn: initState?.userStore?.tokenExpiresIn,
    })
  ) {
    clearAxiosToken();
    clearCookieUser();
  } else {
    // ⚠️
    // 由于代码部分 hooks 的执行速度比 AppGlobalEvent 里的 useEffect([]) 还快
    // 所以 setAxiosToken 放在这里，保证所有 axios 都带上 token
    setAxiosToken(getCookieUserToken({ token: initState?.userStore?.token }));
  }

  // 默认 Master
  let layoutDom = (
    <MasterLayout
      mainComp={props.Component}
      routeProps={props.routeProps}
      pageProps={props.pageProps}
    />
  );

  // 遇到个别属于 auth 的 login/join 要走 auth
  if (['/login', '/join'].includes(props.router.pathname)) {
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
          <QueryClientProvider client={queryClient}>
            {configs.app.__DEV__ ? (
              <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-right"
              />
            ) : null}

            <AppGlobalFetch />
            <AppGlobalEvent />

            <NextNprogress
              color="#0003"
              startPosition={0}
              height={1}
              showOnShallow
              options={{
                speed: 180,
                showSpinner: false,
              }}
            />

            {layoutDom}
          </QueryClientProvider>
        </HelmetProvider>
      </AntdConfigProvider>
    </ErrorBoundary>
  );
};

export default appWithTranslation(CustomApp as any);

// 全局 State
// ⚠️ 目前弃用这种方式，因为项目一旦出现 getInitialProps，就没办法享受 Next.js 的自动优化
//    所以改为每个 page 中都调用全局的 _getServerSideProps 获取基础数据
//
// Client 会在「路由切换后」执行（多次）
// Server 会在「页面刷新后」执行（一次）
//
// getInitialProps 的所有操作都不在 Client 执行
// CustomApp.getInitialProps = async (app: AppContextType) => {}
