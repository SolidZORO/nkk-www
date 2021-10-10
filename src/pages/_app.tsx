/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import cookie from 'cookie';
import { Router } from 'next/router';
import NextNprogress from 'nextjs-progressbar';
import { ConfigProvider as AntdConfigProvider, Spin } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { AppContextType } from 'next/dist/shared/lib/utils';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import zhCN from 'antd/lib/locale/zh_CN';

import { StoreProvider } from '@/stores';
import { MasterLayout } from '@/layouts/MasterLayout/MasterLayout';
import { AuthLayout } from '@/layouts/AuthLayout/AuthLayout';
import { ILayout } from '@/types/comp.type';
import { configs } from '@/configs';
import { axios, setAxiosToken } from '@/libs/axios.lib';
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
import {
  checkCookieUserIsAvailably,
  getCookieUserToken,
} from '@/utils/user.util';

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
  if (checkCookieUserIsAvailably({ token, tokenExpiresIn })) {
    // ⚠️
    // 由于代码部分 fetch hooks 的执行速度比 AppGlobalEvent 里的 useEffect([]) 还快
    // 所以 setAxiosToken 放在这里，保证所有 fetch 都带上 token
    setAxiosToken(getCookieUserToken({ token }));
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
          <StoreProvider {...props.pageProps}>
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
          </StoreProvider>
        </HelmetProvider>
      </AntdConfigProvider>
    </ErrorBoundary>
  );
}

// 全局 State
//
// Client 会在「路由切换后」执行（多次）
// Server 会在「页面刷新后」执行（一次）
//
// ⚠️ getInitialProps 的所有操作都不在 Client 执行
CustomApp.getInitialProps = async (app: AppContextType) => {
  if (!isServer()) return {};

  const settingsRes: {
    data: { data: IApiSettingAllItem };
  } = await axios.get(`${configs.url.API_URL}/settings/all`);

  /*
   * 在 Client / Server 共享 cookies
   *
   * 相对于其他方案，我的思路很简单之前 SPA Client 代码完全不用动，该怎么写就怎么写，
   * 只是 token 之类的变量需放在 cookies，因为要让 Next.js 在 Client 发 req 时拿到
   *
   * 1. Client 登录后，会把 token 写在 Client 的 cookies 中
   * 2. 当下次 Client 页面刷新后，Server 会拿到 Client 的 req.cookies
   *    然后 Server 会把拿到的 cookies 注入到 initState 里面
   *    这样无论 C/S 就都可以在 Store 拿到 cookies（也可以说是 token）
   * 3. 然后 C/S 会走一轮权限判断、按权限渲染 Comps 什么的，而且可以肯定 C/S 完全 match！
   * 4. 还有什么吗？好像就这样简单几步
   *
   * PS1. 在 useStore 还不可用的时候（StoresProvider 还没起来）或者在部分纯 Fn 下如果
   *      需要判断用户权限（比如 checkUserIsAvailably）这种，可以在这些 Fn 开一个口，
   *      直接把 token 当成 args 传进去救急（这种情况一般是 initApp 时会用到）
   *
   * PS2. 在 axios 怎么拿到 Authorization Bearer？
   *      其实最简单的方式就是在这里（没错就是当前 getInitialProps）直接就 setToken 了
   *
   * */
  const reqCookies = cookie.parse(app.ctx?.req?.headers?.cookie || '');

  setAxiosToken(
    getCookieUserToken({ token: reqCookies?.[configs.user.USER_TOKEN_NAME] }),
  );

  return {
    pageProps: {
      initState: {
        appStore: {
          setting: settingsRes?.data?.data,
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
