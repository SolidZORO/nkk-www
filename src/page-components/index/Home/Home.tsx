import cx from 'classnames';
import React from 'react';

import { IPageBaseProps } from '@/types';
import { AppGlobalFetch, HtmlMeta, PageWrapper } from '@/components';
import { configs } from '@/configs';
import { useStore } from '@/stores';

import styles from './styles.module.less';
import { observer } from 'mobx-react';

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
        <h2>APP {configs.app.NAME}</h2>
        <code>{JSON.stringify(appStore.setting)}</code>
      </div>
    </PageWrapper>
  );
};

Home = observer(Home);
export { Home };
