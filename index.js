/* eslint strict: 0 */
'use strict';

const path = require('path');
const build = require(path.resolve(__dirname, 'build.js'));
const webpackConfig = require(path.resolve(__dirname, 'make-webpack.config.js'));

console.dir(build(), { depth: null, colors: true });

module.exports = {
  build,
  webpackConfig
};
