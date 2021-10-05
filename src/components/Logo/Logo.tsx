import React from 'react';
import cx from 'classnames';

import { ICompBaseProps } from '@/types';
import { LiLogo } from '@/libs/react-icons-ext/li';

import styles from './style.module.less';

interface IProps extends ICompBaseProps {}

export const Logo: React.FC<IProps> = (props) => {
  return (
    <div
      className={cx(
        styles['comp-wrapper'],
        { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
        `g-comp--${Logo.displayName}`,
        props.className,
      )}
      style={props.style}
    >
      <LiLogo />
    </div>
  );
};
