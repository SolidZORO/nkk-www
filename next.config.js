/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');
// const withImages = require('next-images');
// const optimizedImages = require('next-optimized-images');

// const { getBuildInfo } = require('./scripts/tools/__fn');

const pluginAntdLess = withAntdLess({
  // modifyVars: {
  //   '@THEME--DARK': 'theme-dark',
  // },
  lessVarsFilePath: './src/styles/variables.less',
  // cssLoaderOptions: {
  //   esModule: false,
  //   sourceMap: false,
  //   modules: {
  //     mode: 'local',
  //   },
  // },
});

module.exports = withPlugins(
  [
    // [
    //   optimizedImages,
    //   {
    //     optimizeImages: false,
    //     mozjpeg: {
    //       quality: 90,
    //     },
    //   },
    // ],
    [pluginAntdLess],
  ],
  {
    // env: {
    //   NEXT_PUBLIC_BUILD_INFO: JSON.stringify(getBuildInfo),
    // },
    webpack(webpackConfig) {
      return webpackConfig;
    },
  },
);
