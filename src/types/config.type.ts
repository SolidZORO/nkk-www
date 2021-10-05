export interface IDotEnv {
  // PUBLIC_URL: string;
  //
  NEXT_PUBLIC_APP_NAME: string;
  //
  // webpackPluginDefine
  NEXT_PUBLIC_BUILD_INFO: IBuildInfo;
}

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
