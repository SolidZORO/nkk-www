import { useMutation } from 'react-query';

import { configs } from '@/configs';
import { axios } from '@/libs/axios.lib';
import { ILoginReq, ILoginRes, IRqMutItemOpts } from '@/types';
import { handleAxiosPostCatch, handleAxiosPostItem } from '@/utils/axios.util';
import { IAxiosRawResItem } from '@/types/api';

type IMutReq = ILoginReq;
type IMutRes = ILoginRes;

export function useMutationLogin(
  rqMutationOpts?: IRqMutItemOpts<IMutRes, IMutReq>,
) {
  const API_URL = `${configs.url.API_URL}/auth/login`;

  return useMutation(
    (data) =>
      axios
        .post<any, IAxiosRawResItem<IMutRes>>(API_URL, data)
        .then((rawRes) => handleAxiosPostItem(rawRes, rqMutationOpts))
        .catch(handleAxiosPostCatch),
    {
      ...rqMutationOpts,
    },
  );
}
