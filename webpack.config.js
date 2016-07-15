/*
* @Author: tengfeisu
* @Date:   2016-05-23 14:09:27
* @Last Modified by:   tengfeisu
* @Last Modified time: 2016-07-15 16:07:33
*/

'use strict';

var webpack = require('webpack');
var path = require('path');
// 生成HTML的插件，
var HtmlwebpackPlugin = require('html-webpack-plugin');
// 将你的样式提取到单独的css文件里
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 生成一个记录了版本号的文件
var AssetsPlugin = require('assets-webpack-plugin');
// glob模块，用于读取webpack入口目录文件
var glob = require('glob');
//webpack插件，用于清除目录文件
var CleanPlugin = require('clean-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH,'src');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');

console.log(SRC_PATH);

module.exports = {
    // 模块入口
    entry: {
        'index': SRC_PATH + '/js/index.js',
        'about': SRC_PATH + '/js/about.js',
        'list': SRC_PATH + '/js/list.js'
    },
    // 模块出口
    output: {
        // 输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        path: path.join(__dirname,'build'),
        // 每个页面对应的主js的生成配置
        filename: 'js/[name]-[chunkhash:8].js',
        //模板、样式、脚本、图片等资源对应的server上的路径
        publicPath: '/build/',
        // chunk生成的配置
        chunkFilename: 'js/[name]-[chunkhash:8].js'
    },

    module: {
        loaders: [
          //.css 文件使用 style-loader 和 css-loader 来处理
          {
            test: /\.less$/,
            //配置less的抽取器、加载器。中间!有必要解释一下，
            //根据从右到左的顺序依次调用less、css加载器，前一个的输出是后一个的输入
            //你也可以开发自己的loader哟。有关loader的写法可自行谷歌之。
            loader: ExtractTextPlugin.extract(
                    'css?sourceMap!'+'less?sourceMap'
                )
          },
          {
                //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
                //比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
                test: /\.html$/,
                loader: "html?attrs=img:src img:data-src"
          },
          {
                //文件加载器，处理文件静态资源
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
          },
          {
            test: /\.js$/,
            loader: 'babel'
          },
          {
            //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
            //如下配置，将小于8192byte的图片转成base64码
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
        new ExtractTextPlugin("/css/[name].css"),  //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
        //HtmlWebpackPlugin，模板生成相关的配置，每个对于一个页面的配置，有几个写几个
        new HtmlwebpackPlugin({ //根据模板插入css/js等生成最终HTML
            // title: 'hello world app!',  //favicon路径，通过webpack引入同时可以生成hash值
            favicon: 'favicon.ico',
            filename: 'html/index.html',
            template: 'src/html/index.html',
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['vendors', 'index'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: {  // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace:false // 移除空白符与换行符
            }
        }),
        new HtmlwebpackPlugin({ //根据模板插入css/js等生成最终HTML
            favicon: 'favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: 'html/list.html', //生成的html存放路径，相对于path
            template: 'src/html/list.html', //html模板路径
            inject: true, //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['vendors', 'list'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new HtmlwebpackPlugin({ //根据模板插入css/js等生成最终HTML
            favicon: 'favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: 'html/about.html', //生成的html存放路径，相对于path
            template: 'src/html/about.html', //html模板路径
            inject: true, //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['vendors', 'about'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        // js压缩
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
        }),
        new webpack.ProvidePlugin({
            // 加载JS
            $: 'jquery'
        }),
        new CleanPlugin(['build']),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: ['index','list','about'], //提取哪些模块共有的部分
            minChunks: 3 // 提取至少3个模块共有的部分
        })
    ]

};
