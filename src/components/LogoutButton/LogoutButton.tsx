import React from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { FiLogOut } from 'react-icons/fi';

import { EventButton } from '@/components';
import { useStore } from '@/stores';
import { configs } from '@/configs';

import styles from './styles.module.less';

interface IProps {
  className?: string;
  style?: React.CSSProperties;
  alwaysDarkMode?: boolean;
}

export const LogoutButton: React.FC<IProps> = (props) => {
  const { userStore } = useStore();
  const history = useRouter();

  const onLogout = () => {
    userStore.removeUser();

    history.push(configs.url.LOGIN);
  };

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
      <EventButton onClick={onLogout}>
        <span>安全退出</span> <FiLogOut />
      </EventButton>
    </div>
  );
};
