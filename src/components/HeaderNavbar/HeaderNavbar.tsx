import React from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { FiPercent } from 'react-icons/fi';

import { ICompBaseProps } from '@/types';
import { Logo, SmartLink } from '@/components';

import styles from './style.module.less';

interface IProps extends ICompBaseProps {}

export const HeaderNavbar: React.FC<IProps> = (props) => {
  const { pathname } = useRouter();

  const navs = [
    { to: '/about', text: 'about', icon: <FiPercent />, exact: true },
  ];

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

      <div className={styles['nav-liist']}>
        {navs.map((nav) => (
          <SmartLink
            href={nav.to}
            key={nav.to}
            className={cx(styles['nav-link'], {
              [styles['nav-link--active']]: pathname === nav.to,
            })}
          >
            <span className={styles['nav-button']}>{nav.text}</span>
          </SmartLink>
        ))}
      </div>
    </div>
  );
};
