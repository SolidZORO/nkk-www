/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');
// const withImages = require('next-images');
const optimizedImages = require('next-optimized-images');

const { i18n } = require('./next-i18next.config');

const { getBuildInfo } = require('./scripts/tools/__fn');
const {
  overrideWebpackConfig,
} = require('./scripts/next/next-plugin--watcher');

module.exports = withPlugins(
  [
    [optimizedImages, { optimizeImages: false, mozjpeg: { quality: 90 } }],
    [withAntdLess, { lessVarsFilePath: './src/styles/variables.less' }],
    [overrideWebpackConfig],
  ],
  {
    env: {
      NEXT_PUBLIC_BUILD_INFO: JSON.stringify(getBuildInfo),
    },
    i18n,
    webpack(webpackConfig) {
      return webpackConfig;
    },
  },
);
