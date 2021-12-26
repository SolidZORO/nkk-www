import React from 'react';
import cx from 'classnames';
import { Avatar, Button, Popover } from 'antd';
import { FiChevronDown } from 'react-icons/fi';

import { LogoutButton, SmartLink } from '@/components';
import { configs } from '@/configs';
import { IAuthUser, ICompBaseProps } from '@/types';

import styles from './styles.module.less';

interface IProps extends ICompBaseProps {
  userInfo?: Partial<IAuthUser> | null;
  size?: number;
}

export const UserMenu: React.FC<IProps> = (props) => {
  const { userInfo } = props;

  const menuDom = (
    <div className={cx(styles['usermenu-box'])}>
      <div className={styles['header']}>
        <SmartLink href={`/users/${userInfo?.id}`}>
          {userInfo?.name || userInfo?.email}
        </SmartLink>
        !<sup>#{userInfo?.id} </sup>
      </div>

      <div className={styles['container']}>
        <div className={styles['roles']}>
          {userInfo?.roles?.map((r) => (
            <strong key={JSON.stringify(r)}>{r}</strong>
          ))}
        </div>

        <div className={styles['version']}>v{configs.app.VERSION}</div>
      </div>

      <div className={styles['footer']}>
        <LogoutButton />
      </div>
    </div>
  );

  return (
    <div
      className={cx(
        styles['comp-wrapper'],
        'g-mod--usermenu-wrapper',
        { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
        props.className,
        `g-comp--${UserMenu.displayName}`,
      )}
      style={props.style}
    >
      <Popover trigger="click" placement="topRight" content={menuDom}>
        <Button type="link" className={styles['usermenu-button']}>
          <Avatar
            size={props.size || 30}
            alt={userInfo?.name}
            className={styles['user-avatar']}
            icon={<img src="/images/default-avatar.png" alt="user avatar" />}
          >
            {userInfo?.name}
          </Avatar>

          <span className={styles['user-name']}>{userInfo?.name}</span>

          <FiChevronDown />
        </Button>
      </Popover>
    </div>
  );
};
