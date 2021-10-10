import { useQuery } from 'react-query';

import { configs } from '@/configs';
import { axios } from '@/libs/axios.lib';
import { handleAxiosGetCatch, handleAxiosGetItem } from '@/utils/axios.util';
import { IRqQueryItemOpts } from '@/types';
import {
  IApiSettingAllItem,
  IApiSettingListReq,
  IAxiosRawResItem,
} from '@/types/api';

type IQueryReq = IApiSettingListReq;
type IQueryRes = IApiSettingAllItem;

export function useQueryAllSetting(
  params?: IQueryReq,
  rqQueryOpts?: IRqQueryItemOpts<IQueryRes>,
) {
  const API_URL = `${configs.url.API_URL}/settings/all`;

  return useQuery(
    [API_URL, params],
    () =>
      axios
        .get<any, IAxiosRawResItem<IQueryRes>>(API_URL, { params })
        .then((res) => handleAxiosGetItem(res, rqQueryOpts))
        .catch(handleAxiosGetCatch),
    {
      staleTime: configs.rq.STALETIME_INFINITY,
      ...rqQueryOpts,
    },
  );
}
