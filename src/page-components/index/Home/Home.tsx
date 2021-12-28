import cx from 'classnames';
import React from 'react';
import { RiHomeLine } from 'react-icons/ri';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';

import { IPageBaseProps } from '@/types';
import { HtmlMeta, PageWrapper } from '@/components';
import { configs } from '@/configs';
import { appStore } from '@/stores';

import styles from './styles.module.less';

interface IProps extends IPageBaseProps {}

export const Home: React.FC<IProps> = (props) => {
  const [setting] = useAtom(appStore.setting);
  const { t } = useTranslation();

  return (
    <PageWrapper
      className={cx(
        styles['comp-wrapper'],
        { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
        `g-comp--${Home.displayName}`,
        props.className,
      )}
      style={props.style}
    >
      <HtmlMeta title={configs.app.NAME} disableSiteName />

      <div className={styles['banner']}>
        <h2>
          <RiHomeLine />
        </h2>

        <div className={styles['welcome']}>
          {t('common.welcome_to', { appName: setting?.site_name || '__NKK__' })}
        </div>
      </div>
    </PageWrapper>
  );
};
