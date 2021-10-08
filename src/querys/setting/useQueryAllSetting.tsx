import { useQuery } from 'react-query';

import { configs } from '@/configs';
import { fetcher } from '@/libs/fetcher.lib';
import { handleFetchCatch, handleFetchItem } from '@/utils/msg.util';
import { IRqItemOpts } from '@/types';
import { IApiSettingListReq } from '@/types/api';

export function useQueryAllSetting(
  params?: IApiSettingListReq,
  rqOpts?: IRqItemOpts<{ [key: string]: any }>,
) {
  const apiUrl = `${configs.url.API_URL}/settings/all`;

  return useQuery(
    [apiUrl, params],
    () =>
      fetcher
        .get(apiUrl, { params })
        .then((res) => handleFetchItem(res, rqOpts))
        .catch(handleFetchCatch),
    // @ts-ignore
    {
      // staleTime: configs.rq.STALETIME_INFINITY,
      ...rqOpts,
    },
  );
}
