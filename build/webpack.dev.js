// webpack.dev.js
// 存放 dev 配置
const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const path = require('path');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: { // 开发服务器y
        port:8088,
        contentBase: '../dist'
    },
    output: { // 输出
        filename: 'js/[name].[hash].js', // 每次保存 hash 都变化
        path: path.resolve(__dirname, '../dist')
    },
    module: {},
    mode: 'production',
});