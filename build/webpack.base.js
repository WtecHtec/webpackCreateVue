// webpack.base.js
// 存放 dev 和 prod 通用配置
const webpack = require('webpack');
const path = require("path");
const px2rem  = require ('postcss-plugin-px2rem');
const px2remOpts = {

  };
// html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// vue-loader 插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');



function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    entry: {
        index:'./src/index.js'
    }, //入口
    module: {
        rules: [
            // 转换 js
            // {
            //     test: /\.js$/,
            //     include: [resolve('src'), resolve('test')],
            //     use: [{
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['es2015']
            //         }
            //     }]
            // },
            { // 处理ES6的js文件的打包
                test: /\.js$/,
                loader: 'babel-loader',
                //排除 node_modules下的所有
                // exclude: /node_modules/,
              
                include: [resolve('src')],
                options: {
                    presets: ['es2015'],//关键字
                    plugins: ['transform-runtime'],//函数
                }
            },
            // 转换vue文件
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // 转换scss css sass
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            // 转换 less
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
               //转换 svg
            {
                test:/\.svg$/,
                loader: 'svg-sprite-loader',
                include: [resolve('src')],
                options: {
                    symbolId: 'icon-[name]'
                }
            },
            //转换 图片
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                exclude:[resolve('src/icons')],
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            // 转换视频
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]'
                }
            },
            // 转换 字体
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }

        ]
    },
    plugins: [
     
          
        // 解决vender后面的hash每次都改变
        new webpack.HashedModuleIdsPlugin(),
        // 请确保引入这个插件来施展魔法
        new VueLoaderPlugin(),

        // 加载模板
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/index.html'),
            template: path.resolve(__dirname, '../index.html'),
            minify:{ //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:true    //删除空白符与换行符
            },
            inject: true,
            chunks:['manifest','vendor','index'],
        }) ,
          new webpack.LoaderOptionsPlugin({
                  options: {
                postcsLoader: [
                        require('postcss-plugin-px2rem')(
                                        {
                                            rootValue: 170, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                                            // unitPrecision: 5, //允许REM单位增长到的十进制数字。
                                            //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                                            // propBlackList: [], //黑名单
                                            exclude: false, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                                            // selectorBlackList: [], //要忽略并保留为px的选择器
                                            // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                                            // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                                            mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
                                            minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
                                        }
                        )
                    ]
                            
                }
            }),
    ],// 插件
 
};