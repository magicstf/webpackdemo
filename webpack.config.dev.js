/*
* @Author: tengfeisu
* @Date:   2016-07-13 17:29:03
* @Last Modified by:   tengfeisu
* @Last Modified time: 2016-07-13 17:48:56
*/

'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'cheap-eval-source-map',
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:8080',
        'webpack/hot/dev-server',
        './src/js/index',
        './src/js/a',
        './src/less/main.less'
    ],
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
      },
      devServer: {
        contentBase: './build',
        hot: true
      }
}
