const webpack = require('webpack');

module.exports.getConfig = function(isProduction, runApp) {
  const config = {
    entry: `./${runApp}/scripts/main.js`,
    output: {
      path: __dirname,
      filename: 'main.js'
    },
    debug : !isProduction,
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

  if (isProduction) {
    config.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          // This has effect on the react lib size
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false }
      })
    ];
  } else {
    config.devtool = 'eval';
  }

  return config;
};