import { HttpStatus } from '@/consts/http-status.const';

export const fmtHttpRes = (
  data: any = null,
  statusCode: number = HttpStatus.OK,
  message: string = '',
  headers: any = {},
  opts: any = {},
) => {
  // console.log('fmtRes', data, code, message, headers, opts);

  return {
    statusCode,
    message,
    data,
    headers,
    opts,
  };
};

export function fmtDataList(
  result: {
    rows: any[];
    count: number;
  },
  paginate: any,
) {
  return {
    page: paginate.page,
    page_size: paginate.page_size,
    total: Array.isArray(result.count) ? result.count?.length : result.count,
    data: result.rows,
  };
}

export function fmtDataItem(
  item?: any | null | undefined,
) {
  return item;
}
