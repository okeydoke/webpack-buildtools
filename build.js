/* eslint strict: 0 */
'use strict';

const path = require('path');
const exec = require('child_process').exec;
const defaultConfigPath = path.resolve(__dirname, './make-webpack.config.js');

module.exports = function webpackBuild(configPath = defaultConfigPath) {
  const webpackPath = path.resolve(__dirname, './node_modules/.bin');
  const environ = (! process.argv.indexOf('--development')) ? 'development' : 'production';
  let cmdLine = `${webpackPath}/webpack --progress --config ${configPath}`;

  if (process.platform === 'win32') {
    cmdLine = `set NODE_ENV=${environ} && ${cmdLine}`;
  } else {
    cmdLine = `NODE_ENV=${environ} ${cmdLine}`;
  }

  const command = exec(cmdLine);

  command.stdout.on('data', (data) => {
    process.stdout.write(data);
  });
  command.stderr.on('data', (data) => {
    process.stderr.write(data);
  });
  command.on('error', (err) => {
    process.stderr.write(err);
  });
};

