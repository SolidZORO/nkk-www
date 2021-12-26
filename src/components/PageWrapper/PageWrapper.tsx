import cx from 'classnames';
import React from 'react';
import { Spin } from 'antd';

import { ICompBaseProps } from '@/types';

import styles from './styles.module.less';

interface IProps extends ICompBaseProps {
  title?: string | React.ReactNode | undefined | null;
  titleToolbar?: string | React.ReactNode;
  titleClassName?: string;
  //
  extend?: string | React.ReactNode;
  disableHeader?: boolean;
  //
  loading?: boolean;
  children: React.ReactNode;
}

export const PageWrapper: React.FC<IProps> = (props) => {
  const titleDom = (
    <div className={cx(styles['title-wrapper'], 'g-PageWrapper-title-wrapper')}>
      {props.title ? (
        <h2
          className={cx(
            styles['title'],
            'g-PageWrapper-title',
            props.titleClassName,
          )}
        >
          {props.title}
        </h2>
      ) : null}

      {props.titleToolbar ? (
        <div
          className={cx(styles['title-toolbar'], 'g-PageWrapper-title-toolbar')}
        >
          {props.titleToolbar}
        </div>
      ) : null}
    </div>
  );

  const extendDom = (
    <div
      className={cx(styles['extend-wrapper'], 'g-PageWrapper-extend-wrapper')}
    >
      {props.extend}
    </div>
  );

  const headerDom = !props.disableHeader ? (
    <div
      className={cx(styles['header-wrapper'], 'g-PageWrapper-header-wrapper')}
    >
      {titleDom}
      {extendDom}
    </div>
  ) : null;

  return (
    <Spin spinning={props.loading === true}>
      <div
        className={cx(
          styles['comp-wrapper'],
          { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
          props.className,
          'g-comp-wrapper--PageWrapper',
          `g-comp--${PageWrapper.displayName}`,
        )}
        style={props.style}
      >
        {headerDom}
        {props.children}
      </div>
    </Spin>
  );
};
