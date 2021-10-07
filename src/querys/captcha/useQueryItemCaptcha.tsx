import { useQuery } from 'react-query';

import { configs } from '@/configs';
import { fetcher } from '@/libs/fetcher.lib';
import { handleFetchCatch, handleFetchItem } from '@/utils/msg.util';
import { IRqItemOpts } from '@/types';
import { IApiAuthCaptchaItemItem, IApiAuthCaptchaItemReq } from '@/types/api';

export function useQueryItemCaptcha(
  params?: IApiAuthCaptchaItemReq,
  rqOpts?: IRqItemOpts<IApiAuthCaptchaItemItem>,
) {
  const apiUrl = `${configs.url.API_URL}/captchas`;

  return useQuery(
    [apiUrl, params],
    () =>
      fetcher
        .get(apiUrl, { params })
        .then((res) => handleFetchItem(res, rqOpts))
        .catch(handleFetchCatch),
    // @ts-ignore
    {
      ...rqOpts,
    },
  );
}
