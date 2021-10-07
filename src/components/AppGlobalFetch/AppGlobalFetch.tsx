import { observer } from 'mobx-react';
import React from 'react';
import { useStore } from '@/stores';
import { useQueryAllSetting } from '@/querys/setting';

interface IProps {
  children?: React.ReactNode | any;
}

// eslint-disable-next-line import/no-mutable-exports
let AppGlobalFetch: React.FC<IProps> = (props) => {
  const { appStore } = useStore();

  useQueryAllSetting(undefined, {
    onSuccess: (data) => {
      appStore.setSetting(data);
    },
  });

  return props.children || null;
};

AppGlobalFetch = observer(AppGlobalFetch);
export { AppGlobalFetch };
