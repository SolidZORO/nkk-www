import cx from 'classnames';
import React from 'react';
import { observer } from 'mobx-react';
import { RiHomeLine } from 'react-icons/ri';

import { IPageBaseProps } from '@/types';
import { HtmlMeta, PageWrapper } from '@/components';
import { configs } from '@/configs';
import { useStore } from '@/stores';

import styles from './styles.module.less';

interface IProps extends IPageBaseProps {}

// eslint-disable-next-line import/no-mutable-exports
let Home: React.FC<IProps> = (props) => {
  const { appStore } = useStore();

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
        <code>{appStore.setting?.site_name}</code>
      </div>
    </PageWrapper>
  );
};

Home = observer(Home);
export { Home };
