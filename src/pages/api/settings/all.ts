import { NextApiRequest, NextApiResponse } from 'next';

import { HttpStatus } from '@/consts/http-status.const';
import { fmtDataItem, fmtHttpRes } from '@/utils/fmt.util';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(HttpStatus.OK).json(
      fmtHttpRes(
        fmtDataItem({
          site_name: 'NKK',
          site_description: 'THIS A DESC',
          enabled_captcha: '1',
          is_mock_data: '1',
        }),
      ),
    );
  }
}
