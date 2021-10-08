import React from 'react';
import cx from 'classnames';

import { ICompBaseProps } from '@/types';
import { configs } from '@/configs';
import { Logo, SmartLink } from '@/components';

import styles from './style.module.less';

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
        <div className={styles['copyright-text']}>
          Copyright © {new Date().getFullYear()}{' '}
          <SmartLink href="/" target="_blank" rel="noreferrer">
            {configs.app.NAME}
          </SmartLink>
          , All rights reserved.
        </div>

        <SmartLink href="/" className={cx(styles['logo-link'])}>
          <Logo className={styles['logo']} />
        </SmartLink>
      </div>
    </div>
  );
};
