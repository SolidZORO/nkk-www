/* eslint-disable max-len */
import { __env__ } from './env';
import { buildConfig } from './build.config';

export const app = {
  __DEV__: process.env.NODE_ENV !== 'production',
  //
  NAME: __env__.NEXT_PUBLIC_APP_NAME || 'NKK',
  //
  // Build Info (/scripts/tools/__fn.js)
  ...buildConfig,
};
