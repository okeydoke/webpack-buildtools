/* eslint strict: 0 */
'use strict';

const webpack = require('webpack');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const defaultOptions = {
  contextPath: './src',
  entryPath: './index.js',
  outputPath: './dist',
  outputFilename: 'bundle.js',
  testCoverage: false
};

module.exports = function webpackConfig(options = {}) {
  const {
    contextPath,
    entryPath,
    outputPath,
    outputFilename,
    testCoverage
  } = Object.assign(defaultOptions, options);

  return {
    devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
    context: path.join(__dirname, contextPath),
    entry: {
      js: entryPath,
      vendor: ['react']
    },
    output: {
      path: path.join(__dirname, outputPath),
      filename: outputFilename
    },
    module: {
      preLoaders: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components|test_data|-test.js|webpack.tests.js)/,
        loader: (testCoverage ? 'babel-istanbul-loader' : 'eslint-loader')
      }],
      loaders: [{
        test: /\.html$/,
        loader: 'file',
        query: {
          name: '[name].[ext]'
        }
      }, {
        test: /\.css$/,
        loaders: [
          'style',
          'css'
        ]
      }, {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loaders: [
          // 'react-hot',
          'babel-loader'
        ]
      },
      ],
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
      modules: [
        path.resolve(contextPath),
        'node_modules'
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'vendor.bundle.js'
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        output: {
          comments: false
        },
        sourceMap: false
      }),
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
      })
    ],
    devServer: {
      contentBase: contextPath
      // hot: true
    }
  };
};
