import React from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';

import { ICompBaseProps } from '@/types';
import { Logo, SmartLink, UserMenu } from '@/components';
import { useStore } from '@/stores';

import styles from './style.module.less';

interface IProps extends ICompBaseProps {}

// eslint-disable-next-line import/no-mutable-exports
let HeaderNavbar: React.FC<IProps> = (props) => {
  const { pathname } = useRouter();
  const { userStore } = useStore();

  const navs = [
    { to: '/about', text: 'about', exact: true },
    // { to: '/test', text: 'button', exact: true },
    { to: '/login', text: 'login', exact: true },
  ];

  const calcNavbarDom = () =>
    navs.map((nav) => {
      if (nav.to === '/login' && userStore.checkUserIsAvailably()) {
        return (
          <UserMenu
            className={styles['user-menu']}
            size={28}
            key={nav.to}
            userInfo={userStore.userInfo}
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

HeaderNavbar = observer(HeaderNavbar);
export { HeaderNavbar };
