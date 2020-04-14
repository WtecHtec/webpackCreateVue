// webpack.prod.js
// 存放 prod 配置
const path = require('path');
// 合并配置文件
const merge = require('webpack-merge');
// 基本配置
const common = require('./webpack.base.js');
// 打包之前清除文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 分离CSS插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// css js 压缩
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// gzip 打包
const   CompressionPlugin  = require("compression-webpack-plugin")

// css 单独分离
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'js/[name].[contenthash].js', //contenthash 若文件内容无变化，则contenthash 名称不变
        path: path.resolve(__dirname, '../dist'),

    },
    module: {},
    plugins: [

        new CleanWebpackPlugin(),
        // css 分离
        // new MiniCssExtractPlugin({
        //     filename: "css/[name].[hash].css",
        //     chunkFilename: 'css/[id].[hash].css'
        // }),
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash:hex:8].css',
            // Setting the following option to `false` will not extract CSS from codesplit chunks.
            // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
            // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
            // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110

            allChunks: true,
        }),
        // 开启 gzip打包
        new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(js|css)$' // 压缩 js 与 css
            ),
            threshold: 10240,
            minRatio: 0.8
        })

    ],
    optimization: {
        // 分离chunks
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial" // 只打包初始时依赖的第三方
                },
            }
        },
        runtimeChunk: {
            name: "manifest",
        },
        minimizer: [
            // 压缩JS
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_debugger: true, // 去除debugger
                        drop_console: true // 去除console.log
                    },
                },
                cache: true, // 开启缓存
                parallel: true, // 平行压缩
                sourceMap:true // set to true if you want JS source maps
            }),
            // 压缩css
            new OptimizeCSSAssetsPlugin({})
        ]

    },
});
