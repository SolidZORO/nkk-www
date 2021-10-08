import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { IPageBaseProps } from '@/types';
import { configs } from '@/configs';
import { useStore } from '@/stores';
import { removeUser } from '@/utils/user.util';

interface IProps extends IPageBaseProps {
  className?: string;
  style?: React.CSSProperties;
  alwaysDarkMode?: boolean;
}

export const Logout: React.FC<IProps> = (props) => {
  const { userStore } = useStore();
  const history = useRouter();

  useEffect(() => {
    removeUser();
    userStore.removeUser();

    history.push(configs.url.LOGIN);
  }, []);

  return null;
};
