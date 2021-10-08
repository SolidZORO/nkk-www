import { observer } from 'mobx-react';
import React from 'react';
import { useStore } from '@/stores';
import { useQueryAllSetting } from '@/querys/setting';

interface IProps {
  initState?: any;
  children?: React.ReactNode | any;
}

// eslint-disable-next-line import/no-mutable-exports
let AppGlobalFetch: React.FC<IProps> = (props) => {
  const { appStore } = useStore();

  useQueryAllSetting(undefined, {
    onSuccess: (data) => {
      appStore.setSetting(data);
    },
    // initialData: props.initState?.appStore?.setting,
    // enabled: Boolean(!props.initState?.appStore?.setting?.site_name),
  });

  return props.children || null;
};

AppGlobalFetch = observer(AppGlobalFetch);
export { AppGlobalFetch };
