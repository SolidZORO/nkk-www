import React from 'react';
import Head from 'next/head';
import { useAtom } from 'jotai';

import { configs } from '@/configs';
import { ICompBaseProps } from '@/types';
import { appStore } from '@/stores';

interface IProps extends ICompBaseProps {
  title: React.ReactNode;
  disableSiteName?: boolean;
}

export const HtmlMeta: React.FC<IProps> = (props) => {
  const [setting] = useAtom(appStore.setting);

  const siteName = props.disableSiteName
    ? ''
    : ` - ${setting?.site_name || configs.app.NAME}`;

  return (
    <Head>
      <title>
        {props.title || ''}
        {siteName}
      </title>
    </Head>
  );
};
