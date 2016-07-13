/*
* @Author: tengfeisu
* @Date:   2016-05-23 14:09:27
* @Last Modified by:   tengfeisu
* @Last Modified time: 2016-07-13 17:38:46
*/

'use strict';

var path = require('path')
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: ['./src/js/index','./src/js/a'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: '/js/[name].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      title: 'Hello World app',
      filename: 'html/index.html',
      template: 'src/html/index.html',
      inject: true,
      hash: true
    }),
    new ExtractTextPlugin("index.css")
  ],
  module: {
    loaders: [
      //.css 文件使用 style-loader 和 css-loader 来处理
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
            'css?sourceMap!' +
            'less?sourceMap'
        )
      },

      {
        test: /\.js$/,
        loader: 'babel'
      },
      {
        test: /.(png|jpg)$/,
        loader: 'url?limit=8192&name=images/[hash:8].[name].[ext]'
      }
    ]
  }
}
