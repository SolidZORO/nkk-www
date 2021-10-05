import cx from 'classnames';
import React from 'react';

import { IPageBaseProps } from '@/types';
import { HtmlMeta, PageWrapper } from '@/components';
import { configs } from '@/configs';

import styles from './styles.module.less';

interface IProps extends IPageBaseProps {}

export const Home: React.FC<IProps> = (props) => {
  return (
    <PageWrapper
      className={cx(
        styles['comp-wrapper'],
        { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
        `g-comp--${Home.displayName}`,
        props.className,
      )}
      style={props.style}
    >
      <HtmlMeta title={configs.app.NAME} disableSiteName />

      <div className={styles['banner']}>
        <h2>APP {configs.app.NAME}</h2>
      </div>
    </PageWrapper>
  );
};
