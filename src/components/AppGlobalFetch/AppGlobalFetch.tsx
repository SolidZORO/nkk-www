import React from 'react';
import { useAtom } from 'jotai';

import { appStore } from '@/stores';
import { useQueryAllSetting } from '@/querys/setting';

interface IProps {
  children?: React.ReactNode | any;
}

export const AppGlobalFetch: React.FC<IProps> = (props) => {
  const [, setSetting] = useAtom(appStore.setting);

  useQueryAllSetting(undefined, {
    onSuccess: (data) => {
      setSetting(data);
    },
  });

  return props.children || null;
};
