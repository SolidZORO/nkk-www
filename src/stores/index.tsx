import React, { createContext, useContext } from 'react';
import { configure, toJS } from 'mobx';
import { enableStaticRendering } from 'mobx-react';

import { isServer } from '@/utils/env.util';

import { UserStore } from './user.store';
import { AppStore } from './app.store';

enableStaticRendering(isServer());
configure({ enforceActions: 'observed' });

const allStores = (initData?: any) => ({
  appStore: new AppStore(initData),
  userStore: new UserStore(initData),
});

let stores: any = null;
export const StoreContext = createContext(allStores());

const initStore = (initData = {}) => {
  // 每个 store 会找 initData 的值初始化
  let _stores = stores ?? allStores(initData);

  // for SSG and SSR always create a new store
  if (isServer()) return _stores;

  // for CSR
  if (!stores) stores = _stores;

  return _stores;
};

export const StoresProvider: React.FC = (props?: {
  children?: any;
  // @ts-ignore
  initState?: any;
}) => {
  const stores = initStore(props?.initState);

  return (
    <StoreContext.Provider value={stores}>
      {props?.children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw new Error('useStore must be used within StoreProvider');
  }

  return context;
};
