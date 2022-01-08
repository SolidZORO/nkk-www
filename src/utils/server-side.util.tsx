import cookie from 'cookie';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next/types';

import { IApiSettingAllItem } from '@/types/api';
import { axios, setAxiosToken } from '@/libs/axios.lib';
import { configs } from '@/configs';
import { getCookieUserInfo, getCookieUserToken } from '@/utils/user.util';
import { IPageProps } from '@/pages/_app';

/*
 * 全局 State
 * 使用这个 fn 代替 _app.ts 中的 getInitialProps，每个 page 都会调用，保持 next 自动优化
 * */

export const _getServerSideGlobalProps = async (
  ctx: GetServerSidePropsContext,
): Promise<{ props: IPageProps }> => {
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
   * */
  const reqCookies = cookie.parse(ctx?.req?.headers?.cookie || '');

  await setAxiosToken(
    getCookieUserToken({ token: reqCookies?.[configs.user.USER_TOKEN_NAME] }),
  );

  const userInfo = (await reqCookies?.[configs.user.USER_INFO_NAME])
    ? getCookieUserInfo({
        userInfoStr: reqCookies?.[configs.user.USER_INFO_NAME],
      })
    : { permissions: [] };

  // ⚠️ 必须确保每一个 key 都有默认 value，不能为 undefined
  const pageProps: IPageProps = {
    initState: {
      appStore: {
        setting: settingsRes?.data?.data || {},
      },
      userStore: {
        token: reqCookies?.[configs.user.USER_TOKEN_NAME] || '',
        tokenExpiresIn:
          reqCookies?.[configs.user.USER_TOKEN_EXPIRES_IN_NAME] || '',
        userInfo,
        permissions: userInfo.permissions,
      },
    },
  };

  return {
    props: {
      // @ts-ignore
      // ...(await serverSideTranslations(ctx.locale, ['common'])),
      ...(await serverSideTranslations(ctx.locale)),
      ...pageProps,
    },
  };
};
