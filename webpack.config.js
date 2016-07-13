/*
* @Author: tengfeisu
* @Date:   2016-05-23 14:09:27
* @Last Modified by:   tengfeisu
* @Last Modified time: 2016-07-13 18:16:28
*/

'use strict';

var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AssetsPlugin = require('assets-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH,'src');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');

console.log(SRC_PATH);

module.exports = {
    // 模块入口
    entry: {
        'index': SRC_PATH + '/js/index.js',
        // 'a': SRC_PATH + '/js/a.js'
    },
    // 模块出口
    output: {
        // 打包文件存放的绝对路径
        path: path.join(__dirname,'build'),
        // 打包后的文件名
        filename: 'js/[name]-[chunkhash:8].js',
        chunkFilename: 'js/[name]-[chunkhash:8].js'
    },

    module: {
        loaders: [
          //.css 文件使用 style-loader 和 css-loader 来处理
          {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract(
                    'css?sourceMap!'+'less?sourceMap'
                )
          },
          {
            test: /\.js$/,
            loader: 'babel'
          },
          {
            test: /.(png|jpg)$/,
            loader: 'url?limit=8192&name=img/[hash:8].[name].[ext]'
          }
        ]
      },

    resolve: {
        // 自动扩展文件后缀名，在require模块的时候，可以不用写后缀名
        extensions: ['', '.js', '.jsx'],
        // 模块别名定义，方便后续直接引用别名，无需多写长长的地址
        alias: {

        }
    },
    // 插件
    plugins: [
        new ExtractTextPlugin("/css/index.css"),
        // new HtmlwebpackPlugin(),
        new HtmlwebpackPlugin({
            title: 'hello world app!',
            filename: 'html/index.html',
            template: 'src/html/index.html',
            inject: true,
            hash: true,
            // minify: {  // 压缩HTML文件
            //     removeComments: true, // 移除HTML中的注释
            //     collapseWhitespace:true // 移除空白符与换行符
            // }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     except: ['$super','$','exports','require']  //排除关键字
        // }),
        new AssetsPlugin({
            filename: 'build/webpack.assets.js',
            processOutput: function(assets){
                return 'window.WEBPACK_ASSETS = ' + JSON.stringify(assets);
            }
        })
    ]

};
