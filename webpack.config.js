const path = require('path');
const { merge } = require('webpack-merge');

const modeConfig = require(`./webpack`);

module.exports = (env) =>
  merge(
    {
      entry: path.resolve(__dirname, 'src/main.ts'),
      output: {
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js'
      },
      target: 'node',
      node: {
        global: false,
        __filename: false,
        __dirname: false
      },
      stats: {
        // This is optional, but it hides noisey warnings
        warningsFilter: [
          'node_modules/express/lib/view.js',
          'node_modules/@nestjs/common/utils/load-package.util.js',
          'node_modules/@nestjs/core/helpers/load-adapter.js',
          'node_modules/@nestjs/core/helpers/optional-require.js',
          'node_modules/optional/optional.js',
          () => false
        ]
      }
    },
    modeConfig(env)
  );
