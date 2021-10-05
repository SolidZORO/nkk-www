import { IBuildInfo } from '@/types';

const defaultBuildConfig = {
  PKG_NAME: '-',
  VERSION: '0.0.0',
  AUTHOR: '-',
  VERSION_DASH: '0-0-0',
  VERSION_NUMBER: '000',
  NODE_ENV: '-',
  BUILD_TIME: '-',
  GIT_COMMIT_HASH: 'ffff',
};

export const buildConfig: IBuildInfo = process.env.NEXT_PUBLIC_BUILD_INFO
  ? JSON.parse(process.env.NEXT_PUBLIC_BUILD_INFO)
  : defaultBuildConfig;
