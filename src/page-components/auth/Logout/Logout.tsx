import React, { useEffect } from 'react';

import { IPageBaseProps } from '@/types';
import { useSetUserInfo } from '@/hooks';

interface IProps extends IPageBaseProps {}

export const Logout: React.FC<IProps> = () => {
  const { logoutUserAndNavigateToLogin } = useSetUserInfo();

  useEffect(() => {
    logoutUserAndNavigateToLogin();
  }, []);

  return null;
};
