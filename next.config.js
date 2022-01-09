/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');
const optimizedImages = require('next-optimized-images');
const { getBuildInfo } = require('gen-buildinfo-webpack-plugin');

const { i18n } = require('./next-i18next.config');
const withWatcher = require('./scripts/next/next-plugin--watcher');

module.exports = withPlugins(
  [
    [optimizedImages, { optimizeImages: false, mozjpeg: { quality: 90 } }],
    [
      withAntdLess,
      {
        lessVarsFilePath: './src/styles/variables.less',
        // nextjs: {
        //   localIdentNameFollowDev: true,
        // },
      },
    ],
    [withWatcher],
  ],
  {
    env: {
      NEXT_PUBLIC_BUILD_INFO: JSON.stringify(
        getBuildInfo({ package: require('./package.json') }),
      ),
    },
    i18n,
    webpack(webpackConfig) {
      return webpackConfig;
    },
    serverRuntimeConfig: {
      // Will ONLY be available on the server side
      // PUBLIC_DIR: `${__dirname}/public`,
    },
    publicRuntimeConfig: {
      // Will be available on BOTH server and client
      // ROOT_DIR: __dirname,
    },
  },
);
