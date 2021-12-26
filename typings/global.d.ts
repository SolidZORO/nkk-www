declare const window: Window &
  typeof globalThis & {
    NoCaptcha: any;
    __ROUTER_NAVIGATE__: any;
    __CONFIGS__: any;
  };

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}

declare const __DEV__: boolean;
