// import the original type declarations
import 'react-i18next';

// import all namespaces (for the default language, only)
import en from '../public/locales/en/lang.json';
// import zh_CN from '../public/locales/zh-CN/lang.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'lang';
    resources: {
      en: typeof en;
    };
  }
}
