const rootDir = __dirname
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const jsonLoader = require('json-loader');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: rootDir + '/client/index.html',
  filename: 'index.html',
  inject: 'body',
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
  }
})


module.exports = {
  entry: ['./client/main.js'],
  module: {
    loaders: [
      {test:/\.js$/, include: `${rootDir}/client`, loader: 'babel-loader'},
      {include:  /\.json$/, loaders: ['json-loader']}
    ]
  },
  output: {
    filename: 'bundle.js',
    path: `${rootDir}/public/dist`
  },
  plugins: [HTMLWebpackPluginConfig]
}
