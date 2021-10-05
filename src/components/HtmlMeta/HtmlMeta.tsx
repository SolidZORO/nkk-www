import React from 'react';
import Head from 'next/head';

import { configs } from '@/configs';
import { ICompBaseProps } from '@/types';

interface IProps extends ICompBaseProps {
  title: React.ReactNode;
  disableSiteName?: boolean;
}

export const HtmlMeta: React.FC<IProps> = (props) => {
  const siteName = props.disableSiteName ? '' : ` - ${configs.app.NAME}`;

  return (
    <Head>
      <title>
        {props.title || ''}
        {siteName}
      </title>
    </Head>
  );
};
