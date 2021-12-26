import cx from 'classnames';
import React from 'react';
import { Button } from 'antd';

import { IPageBaseProps } from '@/types';
import { HtmlMeta, LoadingButton, PageWrapper } from '@/components';
import { configs } from '@/configs';
import { useSmartNavigate } from '@/hooks';

import styles from './styles.module.less';

interface IProps extends IPageBaseProps {}

export const TestAny: React.FC<IProps> = (props) => {
  const navigate = useSmartNavigate();

  return (
    <PageWrapper
      className={cx(
        styles['comp-wrapper'],
        { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
        `g-comp--${TestAny.displayName}`,
        props.className,
      )}
      style={props.style}
    >
      <HtmlMeta title={configs.app.NAME} disableSiteName />

      <LoadingButton type="primary" size="large" block loading>
        登录
      </LoadingButton>

      <Button onClick={() => navigate('/login', { replace: true })}>
        useSmartNavigate
      </Button>
    </PageWrapper>
  );
};
