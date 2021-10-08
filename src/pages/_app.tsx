/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import * as Nookies from 'nookies';
import { Router } from 'next/router';
import NextNprogress from 'nextjs-progressbar';
import { ConfigProvider as AntdConfigProvider, Spin } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { AppContextType } from 'next/dist/shared/lib/utils';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import zhCN from 'antd/lib/locale/zh_CN';

import { StoresProvider } from '@/stores';
import { MasterLayout } from '@/layouts/MasterLayout/MasterLayout';
import { AuthLayout } from '@/layouts/AuthLayout/AuthLayout';
import { ILayout } from '@/types/comp.type';
import { configs } from '@/configs';
import { fetcher, setFetcherToken } from '@/libs';
import { AppStore } from '@/stores/app.store';
import { IApiSettingAllItem } from '@/types/api';
import { isServer } from '@/utils/env.util';
import { UserStore } from '@/stores/user.store';
import {
  AppGlobalEvent,
  AppGlobalFetch,
  ErrorBoundary,
  PageLoadingSpinner,
} from '@/components';
import { checkUserIsAvailably, getUserToken } from '@/utils/user.util';

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

if (!isServer()) window.__CONFIGS__ = configs;

Spin.setDefaultIndicator(<PageLoadingSpinner />);

export default function CustomApp(props: ICustomApp) {
  const userStore = props.pageProps?.initState?.userStore || {};
  const { token, tokenExpiresIn } = userStore;

  // 检查 user 登录状态（这里还没办法拿到 StoresProvider，只能用 hack 的方法取值）
  if (checkUserIsAvailably({ token, tokenExpiresIn })) {
    // ⚠️
    // 由于代码部分 fetch hooks 的执行速度比 AppGlobalEvent 里的 useEffect([]) 还快
    // 所以 setFetcherToken 放在这里，保证所有 fetch 都带上 token
    setFetcherToken(getUserToken({ token }));
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
          </StoresProvider>
        </HelmetProvider>
      </AntdConfigProvider>
    </ErrorBoundary>
  );
}

// Server 在「页面刷新后」执行（一次）
// Client 在「路由切换后」执行（多次）
CustomApp.getInitialProps = async (app: AppContextType) => {
  // 在 Client 不执行
  if (!isServer()) return {};

  const apiUrl = `${configs.url.API_URL}/settings/all`;

  // 这里试验性的使用 Next.js 自带的 API（Server 需要从 req 里面找到 host，Client 不用）
  // const host = app?.ctx?.req?.headers?.host || '';
  // const protocol =
  //   host?.includes('localhost') || host?.includes('192.168') ? 'http' : 'https';
  //
  // // eslint-disable-next-line max-len
  // const apiUrl = `${protocol}://${app?.ctx?.req?.headers?.host}/api/settings/all`;

  const settingsRes: {
    data: { data: IApiSettingAllItem };
  } = await fetcher.get(apiUrl);

  /*
   * 说明一下，Nookies 这里只是起到一个 parse 作用而已，没有别的用途了
   *
   * 相对于其他方案，我的思路很简单：
   * setCookies 还是前端那一套，只不过 jwtToken 存在 Cookies 而非 LS
   *
   * 1. Client 登录后，会把 token 写在 Client 的 Cookies 中
   * 2. 下次 Client 页面刷新的流程：
   *    2.1. Client 打开 URL
   *    2.2. Server 接到 Client 的 Req，可以拿到 token（在 Cookies 里面）
   *         然后Server 会把 token 注入到 initState 里面
   *         其他地方直接向 Store 拿数据判断什么的
   * 3. Server 根据权限判断 DOM 什么的，最后渲染 DOM
   * 4. 还有什么吗？好像就完了。实在是简简单单。
   *
   * */
  const reqCookies = Nookies.parseCookies(app.ctx);

  return {
    pageProps: {
      initState: {
        appStore: {
          setting: settingsRes.data.data,
        } as Partial<AppStore>,
        userStore: {
          token: reqCookies?.[configs.user.USER_TOKEN_NAME],
          tokenExpiresIn: reqCookies?.[configs.user.USER_TOKEN_EXPIRES_IN_NAME],
          userInfoStr: reqCookies?.[configs.user.USER_INFO_NAME],
        } as Partial<UserStore>,
      },
    },
  };
};
