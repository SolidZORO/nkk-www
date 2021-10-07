// eslint-disable-next-line func-names
module.exports = {
  presets: ['next/babel'],
  plugins: [
    // ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    ['module-resolver', { alias: { '@': './src' } }],
    ['add-react-displayname'],
    ['inline-react-svg'],
    ['import', { libraryName: 'antd', style: true }],
    ['lodash'],
  ],
};
