import React from 'react';
import cx from 'classnames';
import { FiLogOut } from 'react-icons/fi';

import { EventButton } from '@/components';
import { useSetUserInfo } from '@/hooks';

import styles from './styles.module.less';

interface IProps {
  className?: string;
  style?: React.CSSProperties;
  alwaysDarkMode?: boolean;
}

export const LogoutButton: React.FC<IProps> = (props) => {
  const { logoutUserAndNavigateToLogin } = useSetUserInfo();

  return (
    <div
      className={cx(
        styles['comp-wrapper'],
        { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
        props.className,
        `g-comp--${LogoutButton.displayName}`,
      )}
      style={props.style}
    >
      <EventButton onClick={logoutUserAndNavigateToLogin}>
        <span>安全退出</span> <FiLogOut />
      </EventButton>
    </div>
  );
};
