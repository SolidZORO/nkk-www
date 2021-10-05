const moment = require('moment');

// eslint-disable-next-line import/no-extraneous-dependencies
const repoInfo = require('git-repo-info')();
const pkg = require('../../package.json');

const getBuildInfo = {
  PKG_NAME: pkg.name, // 'name',
  VERSION: pkg.version, // '0.0.0',
  AUTHOR: pkg.author, // '-'
  VERSION_DASH: pkg.version.replace(/\./g, '-'), // '0-0-0'
  VERSION_NUMBER: pkg.version.replace(/\./g, ''), // '000'
  NODE_ENV: process.env.NODE_ENV,
  BUILD_TIME: moment()?.format('YYYYMMDD-HHmmss'),
  GIT_COMMIT_HASH: repoInfo.sha?.toString().substr(0, 4) || '0000', // 'ff11'
};

module.exports = { getBuildInfo };
