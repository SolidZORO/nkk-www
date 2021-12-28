import React from 'react';
import cx from 'classnames';

import { ICompBaseProps } from '@/types';
import { configs } from '@/configs';
import { Logo, SmartLink, SwitchLanguage } from '@/components';

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
        </div>

        <div className={cx(styles['logo-link'])}>
          <SwitchLanguage
            className={styles['switch-language']}
            buttonClassName={styles['switch-language-button']}
            placement="topRight"
          />

          <SmartLink href="/">
            <Logo className={styles['logo']} />
          </SmartLink>
        </div>
      </div>
    </div>
  );
};
