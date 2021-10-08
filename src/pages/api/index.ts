import { NextApiRequest, NextApiResponse } from 'next';

import { HttpStatus } from '@/consts/http-status.const';
import { fmtDataItem, fmtHttpRes } from '@/utils/fmt.util';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(HttpStatus.OK).json(
      fmtHttpRes(
        fmtDataItem({
          hey: 'here is Next.js API',
        }),
      ),
    );
  }
}
