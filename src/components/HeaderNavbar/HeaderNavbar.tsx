import React from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { ICompBaseProps } from '@/types';
import { Logo, SmartLink, UserMenu } from '@/components';
import { useSetUserInfo } from '@/hooks';

import styles from './style.module.less';

interface IProps extends ICompBaseProps {}

export const HeaderNavbar: React.FC<IProps> = (props) => {
  const { pathname } = useRouter();
  const { userInfo, checkUserIsAvailably } = useSetUserInfo();
  const { t, i18n } = useTranslation();

  const navs = [
    { to: '/about', text: t('menu.about') },
    // { to: '/test', text: t('menu.test') },
    { to: '/login', text: t('menu.login') },
  ];

  const calcNavbarDom = () =>
    navs.map((nav) => {
      if (nav.to === '/login' && checkUserIsAvailably()) {
        return (
          <UserMenu
            className={cx(styles['user-menu'])}
            size={28}
            key={nav.to}
            userInfo={userInfo}
          />
        );
      }

      return (
        <SmartLink
          href={nav.to}
          key={nav.to}
          className={cx(styles['nav-link'], {
            [styles['nav-link--active']]: pathname === nav.to,
          })}
        >
          <span className={styles['nav-button']}>{nav.text}</span>
        </SmartLink>
      );
    });

  return (
    <div
      className={cx(
        styles['comp-wrapper'],
        { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
        `g-comp--${HeaderNavbar.displayName}`,
        props.className,
      )}
      style={props.style}
    >
      <SmartLink href="/" className={cx(styles['logo-link'])}>
        <Logo className={styles['logo']} />
      </SmartLink>

      <div className={styles['nav-list']}>{calcNavbarDom()}</div>
    </div>
  );
};
