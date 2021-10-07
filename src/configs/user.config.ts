import { __env__ } from './env';

export const user = {
  USER_TOKEN_NAME: 'userToken',
  USER_TOKEN_EXPIRES_IN_NAME: 'userTokenExpiresIn',
  USER_INFO_NAME: 'userInfo',
  VISITOR_TOKEN_NAME: 'visitorToken',
  //
  USER_TABLE_UNIQUE: __env__.NEXT_PUBLIC_USER_TABLE_UNIQUE
    ? __env__.NEXT_PUBLIC_USER_TABLE_UNIQUE.split(',').map((item) =>
        item.trim(),
      )
    : ['phone'],

  WITHOUT_AUTH_URLS: ['/order/success'],
  WITHOUT_AUTH_APIS: ['/order/series/page/get'],
};
