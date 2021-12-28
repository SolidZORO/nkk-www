import cx from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'next-i18next';

import { ILoginReq, IPageBaseProps } from '@/types';
import { HtmlMeta, LoadingButton, PageWrapper, SmartLink } from '@/components';
import { LoginForm } from '@/form-components';
import { setAxiosToken } from '@/libs/axios.lib';
import { configs } from '@/configs';
import { useSetUserInfo, useSmartNavigate } from '@/hooks';

import { getCookieVisitorToken } from '@/utils/user.util';
import { useMutationLogin } from '@/mutaions/auth';

import styles from './styles.module.less';

interface IProps extends IPageBaseProps {}

export const Login: React.FC<IProps> = (props) => {
  const navigate = useSmartNavigate();
  const { t } = useTranslation();

  const {
    checkUserIsAvailably,
    setUserInfo,
    setUserToken,
    setUserPermissions,
  } = useSetUserInfo();

  const loginFormRef = useRef<any>();
  const [userIsAvailable, setUserIsAvailable] = useState(
    checkUserIsAvailably(),
  );

  const loginMutation = useMutationLogin({
    onSuccess: (data) => {
      if (!data || !data.token) {
        loginFormRef.current.form.setFieldsValue({ captcha: '' });
        loginFormRef.current.refetchCaptcha();
        return;
      }

      if (data?.token) {
        setUserToken(data?.token, data?.tokenExpiresIn);
        setAxiosToken(data?.token);
      }

      if (data?.user) {
        setUserInfo(data?.user);
      }

      // 登录成功后，通知 sidebar menus 刷新权限
      setUserPermissions(data?.user?.permissions || []).then(() => {
        // 等待设置完毕后，再跳转
        setUserIsAvailable(true);
      });
    },
  });

  useEffect(() => {
    // 登录过的用户不能再到 /login
    if (userIsAvailable) {
      navigate(configs.url.HOME, { replace: true });
    }
  }, [userIsAvailable]);

  const onSubmit = async () => {
    let formData: ILoginReq;

    try {
      formData = await loginFormRef.current.form.validateFields();
    } catch (err) {
      return console.log(err);
    }

    return loginMutation.mutate({
      ...formData,
      token: await getCookieVisitorToken(),
    });
  };

  if (userIsAvailable) return null;

  return (
    <PageWrapper
      className={cx(
        styles['comp-wrapper'],
        { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
        `g-comp--${Login.displayName}`,
        props.className,
      )}
      style={props.style}
    >
      <HtmlMeta title="Login" />

      <div className={styles['comp-inner']}>
        <LoginForm ref={loginFormRef} onSubmit={onSubmit} />

        <LoadingButton
          type="primary"
          onClick={onSubmit}
          size="large"
          block
          className={styles['login-button-size']}
          loading={loginMutation.isLoading}
        >
          {t('auth.login')}
        </LoadingButton>

        <div className={styles['footer']}>
          <div className={styles['ext-link-home']}>
            <SmartLink href="/">
              <Button type="link">{t('auth.back_index')}</Button>
            </SmartLink>
          </div>

          {/*<div className={styles['ext-link-join']}>*/}
          {/*  <SmartLink href="/join">*/}
          {/*    <Button type="link" size="small">*/}
          {/*      {t('auth.join')}*/}
          {/*    </Button>*/}
          {/*  </SmartLink>*/}
          {/*</div>*/}
        </div>
      </div>
    </PageWrapper>
  );
};
