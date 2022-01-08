import { IBuildInfo } from '@/types';

const DEFAULT_BUILD_INFO = {
  PKG_NAME: '-',
  AUTHOR: '-',
  VERSION: '0.0.0',
  VERSION_DASH: '0-0-0',
  VERSION_NUMBER: '000',
  NODE_ENV: '-',
  BUILD_TIME: '-',
  GIT_COMMIT_HASH: 'ffff',
};

// @see next.config.js
// const { getBuildInfo } = require('gen-buildinfo-webpack-plugin');
export const buildConfig: IBuildInfo = process.env.NEXT_PUBLIC_BUILD_INFO
  ? {
      ...DEFAULT_BUILD_INFO,
      ...JSON.parse(process.env.NEXT_PUBLIC_BUILD_INFO),
    }
  : DEFAULT_BUILD_INFO;
