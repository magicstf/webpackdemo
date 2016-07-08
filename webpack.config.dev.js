/*
* @Author: tengfeisu
* @Date:   2016-05-23 14:09:27
* @Last Modified by:   tengfeisu
* @Last Modified time: 2016-07-08 18:32:19
*/

'use strict';

var webpack = require('webpack');

module.exports = {
    entry: {
        main: ['webpack/hot/dev-server','./app/main.js','./app/main.css'],
        about: './app/about.js',
        vendor: [
          'react',
          'react-dom'
        ]
    },
    output: {
        path: './dist/',
        filename: '[name].js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    },
     plugins: [
      new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    ]
};