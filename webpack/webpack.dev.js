/* eslint-disable prettier/prettier */
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin')
const nodeExternals = require('webpack-node-externals');

const { plugins = [] } = require('./presets/webpack.common');

module.exports = () => ({
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    symlinks: false,
    extensions: ['.ts', '.js', '.json'],
    plugins: [
      new TsconfigPathsPlugin({ configFile: 'tsconfig.json' }),
    ],
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
  },
  performance: {
    hints: false,
  },
  externals: [nodeExternals()],
  plugins: [
    ...plugins,
    new NodemonPlugin({
      nodeArgs: ['--inspect=0.0.0.0:9229'],
    })
  ],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve('.webpackCache'),
            },
          },
        ],
      },
    ],
  },
});
