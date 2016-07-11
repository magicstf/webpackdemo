/*
* @Author: tengfeisu
* @Date:   2016-05-23 14:09:27
* @Last Modified by:   tengfeisu
* @Last Modified time: 2016-07-11 16:36:30
*/

'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        main: ['./app/components/GalleryByReactApp.jsx'],
        vendor: [
          'react',
          'react-dom'
        ]
    },
    stats: {
        colors:true,
        reasons:true
    },
    resolve:{
        extensions:['','.js','.jsx'],
        alias:{
            'styles': __dirname + 'src/styles',
            'mixins': __dirname + 'src/mixins',
            'components': __dirname + 'src/components'
        }
    },
    output: {
        path: './dist/',
        filename: 'components/[name].js',
        publicPath:'/dist'
    },
    devtool:'source-map',
    module: {
        preloaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
        }],
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        },{
            test: /\.css$/,
            loader: "style-loader!css-loader"
        },{
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('css?sourceMap!'+'less?sourceMap')
        },{
            test: /\.(png|jpg|woff|woff2)$/,
            loader: "url-loader?limit=8192"
        }]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor/vendor.bundle.js"),
      // 需要手动添加 HotModuleReplacementPlugin , 命令行的方式会自动添加
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin("[name].css")
    ],
    devServer: {
      hot: true,
      inline: true
    }
};
