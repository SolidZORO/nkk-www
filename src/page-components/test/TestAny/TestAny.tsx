import cx from 'classnames';
import React from 'react';
import { observer } from 'mobx-react';

import { IPageBaseProps } from '@/types';
import { HtmlMeta, LoadingButton, PageWrapper } from '@/components';
import { configs } from '@/configs';

import styles from './styles.module.less';

interface IProps extends IPageBaseProps {}

// eslint-disable-next-line import/no-mutable-exports
let TestAny: React.FC<IProps> = (props) => {
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
    </PageWrapper>
  );
};

TestAny = observer(TestAny);
export { TestAny };
