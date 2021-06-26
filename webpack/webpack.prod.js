/* eslint-disable prettier/prettier */
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const { plugins = [] } = require('./presets/webpack.common');

module.exports = () => ({
  mode: 'production',
  resolve: {
    symlinks: false,
    extensions: ['.js', '.json', '.ts'],
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    plugins: [new TsconfigPathsPlugin({ configFile: 'tsconfig.json' })],
  },
  externals: [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
    '@nestjs/microservices',
    'fastify-swagger',
    '@nestjs/websockets'
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 1000000000,
    maxAssetSize: 1000000000,
  },
  plugins: [new CleanWebpackPlugin(), ...plugins],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true, // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
            },
          },
        ],
      },
    ],
  },
});
