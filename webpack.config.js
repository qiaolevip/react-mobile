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

  if(isDev){
    config.devtool = 'eval';
  }

  return config;
};