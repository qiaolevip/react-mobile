var webpack = require('webpack');

module.exports.getConfig = function(type, runApp) {
  var isDev = type === 'development';

  var config = {
    entry: `./${runApp}/scripts/main.js`,
    output: {
      path: __dirname,
      filename: 'main.js'
    },
    debug : isDev,
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }]
    }
  };

  if (isDev) {
    config.devtool = 'eval';
  } else {
    config.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          // This has effect on the react lib size
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin()
    ];
  }

  return config;
};