import React from 'react';
import cx from 'classnames';
import Link from 'next/link';

import { ICompBaseProps } from '@/types';

import styles from './styles.module.less';

type _ICompBaseProps = ICompBaseProps & Partial<HTMLAnchorElement>;

interface IProps extends _ICompBaseProps {
  href: string;
  children: any;
  // type?: 'push' | 'replace';
  // onClick?: (e?: any) => void;
  // disabledLink?: boolean;
  // usePush?: any; // 部分不方便使用 Router Link 的环境下启用
}

export const SmartLink: React.FC<IProps> = (props) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <Link href={props.href}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        className={cx(
          styles['comp-wrapper'],
          { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
          props.className,
        )}
        style={props.style}
        target={props.target}
        rel={props.rel}
      >
        {props.children}
      </a>
    </Link>
  );
};
