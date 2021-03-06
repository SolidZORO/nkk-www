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
    // ??????
    // ?????????????????? hooks ?????????????????? AppGlobalEvent ?????? useEffect([]) ??????
    // ?????? setAxiosToken ??????????????????????????? axios ????????? token
    setAxiosToken(getCookieUserToken({ token: initState?.userStore?.token }));
  }

  // ?????? Master
  let layoutDom = (
    <MasterLayout
      mainComp={props.Component}
      routeProps={props.routeProps}
      pageProps={props.pageProps}
    />
  );

  // ?????????????????? auth ??? login/join ?????? auth
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

// ?????? State
// ?????? ??????????????????????????????????????????????????? getInitialProps????????????????????? Next.js ???????????????
//    ?????????????????? page ????????????????????? _getServerSideProps ??????????????????
//
// Client ?????????????????????????????????????????????
// Server ?????????????????????????????????????????????
//
// getInitialProps ???????????????????????? Client ??????
// CustomApp.getInitialProps = async (app: AppContextType) => {}
