import { IDotEnv } from '@/types';

// @ts-ignore
// can't pass { ...env } parsing, MUST correspond to 1 to 1
// export const __env__: IDotEnv = process.env as IDotEnv;
export const __env__: IDotEnv = {
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_BUILD_INFO: process.env.NEXT_PUBLIC_BUILD_INFO,
} as IDotEnv;
