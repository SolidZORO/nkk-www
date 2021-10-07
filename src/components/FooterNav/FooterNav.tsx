import React from 'react';
import cx from 'classnames';

import { ICompBaseProps } from '@/types';
import { configs } from '@/configs';

import styles from './style.module.less';
import { Logo, SmartLink } from '@/components';

interface IProps extends ICompBaseProps {}

export const FooterNav: React.FC<IProps> = (props) => {
  return (
    <div
      className={cx(
        styles['comp-wrapper'],
        { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
        `g-comp--${FooterNav.displayName}`,
        props.className,
      )}
      style={props.style}
    >
      <div className={styles['copyright']}>
        <SmartLink href="/" className={cx(styles['logo-link'])}>
          <Logo className={styles['logo']} />
        </SmartLink>

        <div className={styles['copyright-text']}>
          Copyright © {new Date().getFullYear()}{' '}
          <a href={`https://local.com`} target="_blank" rel="noreferrer">
            {configs.app.NAME}
          </a>
          , All rights reserved.
        </div>
      </div>
    </div>
  );
};
