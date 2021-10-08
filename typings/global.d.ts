import { NextRouter } from 'next/router';

declare global {
  interface Window {
    NoCaptcha: any;
    __ROUTER_HISTORY__: NextRouter;
    __CONFIGS__: any;
  }
}

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}

declare const __DEV__: boolean;
