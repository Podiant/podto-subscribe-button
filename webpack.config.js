const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: 'dist/podto-subscribe-button.js'
  },
  // plugins: [
  //   new UglifyJsPlugin()
  // ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', "stage-2"]
        }
      }
    ]
  },
  devtool: 'source-map'
};
