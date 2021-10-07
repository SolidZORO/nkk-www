import { useMutation } from 'react-query';

import { configs } from '@/configs';
import { fetcher } from '@/libs/fetcher.lib';
import { ILoginRes, IRqItemOpts } from '@/types';
import { handleMutCatch, handleMutItem } from '@/utils/msg.util';
import { IFetcherResItem } from '@/types/api';

export function useMutationLogin(rqOpts?: IRqItemOpts<ILoginRes>) {
  const apiUrl = `${configs.url.API_URL}/auth/login`;

  // @ts-ignore
  return useMutation<ILoginRes>(
    (data) =>
      fetcher
        .post<any, IFetcherResItem<ILoginRes>>(apiUrl, data)
        .then((res) => handleMutItem(res, rqOpts))
        .catch(handleMutCatch),
    {
      // staleTime: configs.rq.STALETIME_MOMENT,
      ...rqOpts,
    },
  );
}
