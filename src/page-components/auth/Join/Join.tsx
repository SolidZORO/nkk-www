import cx from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';

import { ILoginReq, IPageBaseProps } from '@/types';
import { HtmlMeta, LoadingButton, PageWrapper, SmartLink } from '@/components';
import { JoinForm } from '@/form-components';
import { setAxiosToken } from '@/libs/axios.lib';
import { configs } from '@/configs';
import { useSetUserInfo, useSmartNavigate } from '@/hooks';
import { useMutationJoin } from '@/mutaions/auth';

import styles from './styles.module.less';

interface IProps extends IPageBaseProps {}

export const Join: React.FC<IProps> = (props) => {
  const navigate = useSmartNavigate();

  const {
    checkUserIsAvailably,
    setUserInfo,
    setUserToken,
    setUserPermissions,
  } = useSetUserInfo();

  const joinFormRef = useRef<any>();
  const [userIsAvailable, setUserIsAvailable] = useState(
    checkUserIsAvailably(),
  );

  const joinMutation = useMutationJoin({
    onSuccess: (data: any) => {
      if (!data?.token) {
        joinFormRef.current.form.setFieldsValue({ captcha: '' });
        joinFormRef.current.refetchCaptcha();
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
      formData = await joinFormRef.current.form.validateFields();
    } catch (err) {
      return console.log(err);
    }

    return joinMutation.mutate({
      ...formData,
    });
  };

  // if (_.isEmpty(toJS(appStore.setting))) return null;

  return (
    <PageWrapper
      className={cx(
        styles['comp-wrapper'],
        { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
        `g-comp--${Join.displayName}`,
        props.className,
      )}
      style={props.style}
    >
      <HtmlMeta title="Join" />

      <div className={styles['comp-inner']}>
        <JoinForm ref={joinFormRef} onSubmit={onSubmit} />

        <LoadingButton
          type="primary"
          onClick={onSubmit}
          size="large"
          block
          className={styles['login-button-size']}
          loading={joinMutation.isLoading}
        >
          注册
        </LoadingButton>

        <div className={styles['footer']}>
          <div className={styles['ext-link-login']}>
            <SmartLink href="/login">
              <Button type="link" size="small">
                返回登录
              </Button>
            </SmartLink>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
