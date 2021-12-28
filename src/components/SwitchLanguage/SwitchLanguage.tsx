import cx from 'classnames';
import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Button, Dropdown, Menu } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';

import { ICompBaseProps } from '@/types';
import { LiLanguage } from '@/libs/react-icons-ext/li';

import styles from './styles.module.less';

interface IProps extends ICompBaseProps, Pick<DropDownProps, 'placement'> {
  buttonClassName?: string;
}

const LANGS = ['en', 'zh-CN'];

export const SwitchLanguage: React.FC<IProps> = (props) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const memoDOm = (
    <Menu>
      {LANGS.map((l) => (
        <Menu.Item key={l}>
          <Button
            type="link"
            onClick={() => {
              router.push(router.pathname, router.pathname, { locale: l });
            }}
          >
            {/* @ts-ignore */}
            {t(`langs.${l}`)}
          </Button>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown
      className={cx(
        styles['comp-wrapper'],
        { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
        `g-comp--${SwitchLanguage.displayName}`,
        props.className,
      )}
      overlay={memoDOm}
      placement={props.placement || 'topLeft'}
    >
      <Button
        type="link"
        size="small"
        className={cx(
          styles['lang-button'],
          'g-comp--button',
          props.buttonClassName,
        )}
      >
        <LiLanguage />

        {/* @ts-ignore */}
        {t(`langs.${i18n.language}`)}
      </Button>
    </Dropdown>
  );
};
