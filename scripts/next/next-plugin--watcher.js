/* eslint-disable */
const path = require('path');
const lessVarToCssVar = require('less-var-to-css-var');
const WatchFileAndRunCallbackWebpackPlugin = require('watch-file-change-and-run-callback-webpack-plugin');

const withWatcher = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { dev, isServer } = options;
      let enrichedConfig = config;

      //
      // Client
      if (!dev || !isServer) {
        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(enrichedConfig, options);
        }

        return enrichedConfig;
      }

      //
      // Server
      const SRC_DIR = path.resolve(__dirname, '../../src');

      enrichedConfig.plugins.push(
        new WatchFileAndRunCallbackWebpackPlugin({
          matchs: [
            {
              filePath: `${SRC_DIR}/styles/variables.less`,
              callback: () => {
                lessVarToCssVar({
                  inputPath: `${SRC_DIR}/styles/variables.less`,
                  outputPath: `${SRC_DIR}/styles/variables-css.less`,
                  scopeTag: ':root',
                  header: "@import '/src/styles/variables.less';",
                });
              },
            },
          ],
        }),
      );

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(enrichedConfig, options);
      }

      return enrichedConfig;
    },
  });
};

module.exports = withWatcher;
