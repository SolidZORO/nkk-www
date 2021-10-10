import { useQuery } from 'react-query';

import { configs } from '@/configs';
import { IRqQueryItemOpts } from '@/types';
import { axios } from '@/libs/axios.lib';
import { handleAxiosGetCatch, handleAxiosGetItem } from '@/utils/axios.util';
import { IApiAuthCaptchaItemItem, IApiAuthCaptchaItemReq } from '@/types/api';

type IQueryReq = IApiAuthCaptchaItemReq;
type IQueryRes = IApiAuthCaptchaItemItem;

export function useQueryItemCaptcha(
  params?: IQueryReq,
  rqQueryOpts?: IRqQueryItemOpts<IQueryRes>,
) {
  const API_URL = `${configs.url.API_URL}/captchas`;

  return useQuery(
    [API_URL, params],
    () =>
      axios
        .get(API_URL, { params })
        .then((res) => handleAxiosGetItem(res, rqQueryOpts))
        .catch(handleAxiosGetCatch),
    {
      // staleTime: configs.rq.STALETIME_MOMENT,
      ...rqQueryOpts,
    },
  );
}
