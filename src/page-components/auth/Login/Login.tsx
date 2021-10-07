// import cx from 'classnames';
// import React from 'react';

// import { IPageBaseProps } from '@/types';
// import { HtmlMeta, PageWrapper } from '@/components';
import cx from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
// import { useHistory } from 'react-router';
// import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Button } from 'antd';

import { ILoginReq, IPageBaseProps } from '@/types';
import { HtmlMeta, LoadingButton, PageWrapper, SmartLink } from '@/components';
import { LoginForm } from '@/form-components';
import { setFetcherToken } from '@/libs';
import { configs } from '@/configs';
import { useStore } from '@/stores';

import {
  checkUserIsAvailably,
  getVisitorToken,
  setUserInfo,
  setUserToken,
} from '@/utils/user.util';
// import { useQueryItemCaptcha } from '@/querys/captcha';
import { useMutationLogin } from '@/mutaions/auth';

import styles from './styles.module.less';

interface IProps extends IPageBaseProps {}

// eslint-disable-next-line import/no-mutable-exports
let Login: React.FC<IProps> = (props) => {
  const history = useRouter();

  const { userStore } = useStore();

  const loginFormRef = useRef<any>();
  const [userIsAvailable, setUserIsAvailable] = useState(
    checkUserIsAvailably(),
  );

  const loginMutation = useMutationLogin({
    onSuccess: (data) => {
      // setSubmitLoading(false);
      if (!data?.token) {
        loginFormRef.current.form.setFieldsValue({ captcha: '' });
        loginFormRef.current.refetchCaptcha();
        return;
      }

      if (data?.token) {
        setUserToken(data?.token, data?.tokenExpiresIn);
        setFetcherToken(data?.token);
      }

      if (data?.user) {
        setUserInfo(data?.user);
      }

      // 登录成功后，mobx observer 会通知 sidebar menus 刷新权限
      userStore.setPermissions(data?.user?.permissions || []).then(() => {
        // 等待设置完毕后，再跳转
        setUserIsAvailable(true);
      });
    },
  });

  useEffect(() => {
    // 登录过的用户不能再到 /login
    if (userIsAvailable) {
      history?.replace(configs.url.HOME);
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
      token: await getVisitorToken(),
    });
  };

  // if (_.isEmpty(toJS(appStore.setting))) return null;

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
        <div className={styles['header']}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/favicons/logo.svg"
            className={styles['logo']}
            alt={configs.app.NAME}
          />

          <h3 className={styles['title']}>Login</h3>
        </div>

        <LoginForm ref={loginFormRef} onSubmit={onSubmit} />

        <LoadingButton
          type="primary"
          onClick={onSubmit}
          size="large"
          block
          className={styles['login-button-size']}
          loading={loginMutation.isLoading}
        >
          登录
        </LoadingButton>

        <div className={styles['footer']}>
          <div className={styles['ext-link-home']}>
            <SmartLink href="/">
              <Button type="link">返回首页</Button>
            </SmartLink>
          </div>

          <div className={styles['ext-link-register']}>
            <SmartLink href="/">
              <Button type="link" size="small">
                注册账户
              </Button>
            </SmartLink>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

Login = observer(Login);
export { Login };
