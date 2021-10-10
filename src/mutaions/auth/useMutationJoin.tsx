import { useMutation } from 'react-query';

import { configs } from '@/configs';
import { axios } from '@/libs/axios.lib';
import { IJoinReq, IJoinRes, IRqMutItemOpts } from '@/types';
import { handleAxiosPostCatch, handleAxiosPostItem } from '@/utils/axios.util';
import { IAxiosRawResItem } from '@/types/api';

type IMutReq = IJoinReq;
type IMutRes = IJoinRes;

export function useMutationJoin(
  rqMutationOpts?: IRqMutItemOpts<IMutRes, IMutReq>,
) {
  const API_URL = `${configs.url.API_URL}/auth/join`;

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
