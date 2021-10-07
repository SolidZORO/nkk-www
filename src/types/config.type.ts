import { __env__ } from '@/configs/env';

export type IDotEnv = typeof __env__;

export interface IBuildInfo {
  PKG_NAME?: string; // 'name',
  VERSION?: string; // '0.0.0',
  AUTHOR?: string; // '-'
  VERSION_DASH?: string; // '0-0-0'
  VERSION_NUMBER?: string; // '000'
  NODE_ENV?: string; // process.env.NODE_ENV,
  BUILD_TIME?: string; // moment().format('YYYYMMDD-HHmmss'),
  GIT_COMMIT_HASH?: string; // 'ff11'
}
