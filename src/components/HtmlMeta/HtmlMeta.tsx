import React from 'react';
import Head from 'next/head';
import { observer } from 'mobx-react';

import { configs } from '@/configs';
import { ICompBaseProps } from '@/types';
import { useStore } from '@/stores';

interface IProps extends ICompBaseProps {
  title: React.ReactNode;
  disableSiteName?: boolean;
}

// eslint-disable-next-line import/no-mutable-exports
let HtmlMeta: React.FC<IProps> = (props) => {
  const { appStore } = useStore();
  const siteName = props.disableSiteName
    ? ''
    : ` - ${appStore?.setting?.site_name || configs.app.NAME}`;

  return (
    <Head>
      <title>
        {props.title || ''}
        {siteName}
      </title>
    </Head>
  );
};

HtmlMeta = observer(HtmlMeta);
export { HtmlMeta };
