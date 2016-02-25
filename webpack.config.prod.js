// jscs:disable
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: false,
  entry:  {
    main: ['./src/client.js'],
    editor: ['./src/routes/Edit'],
    post: ['./src/routes/Post'],
  },
  output: {
     path: __dirname + '/build/static',
     filename: '[name].js',
     chunkFilename: '[id].chunk.js',
     publicPath: '/build/static/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js',  2),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        screw_ie8: true,
      }
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.less$/,
      loader: 'style!css!postcss-loader!less'
    },
    {
      test: /\.css/,
      loader: 'style!css'
    }]
  },
  postcss: function () {
    return [autoprefixer];
  }
};
