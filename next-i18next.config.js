const path = require('path');

const __DEV__ = process.env.NODE_ENV !== 'production';

module.exports = {
  i18n: {
    // debug: __DEV__,
    defaultLocale: 'en',
    locales: ['en', 'zh-CN'],
    defaultNS: 'lang',
    localeDetection: false,
    reloadOnPrerender: __DEV__,
    localePath: path.resolve('./public/locales'),
    // localeDetection: false,
    // localeStructure: '{{lng}}/{{ns}}'
  },
};
