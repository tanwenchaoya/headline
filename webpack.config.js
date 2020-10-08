const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    mode:'development',
    devtool: 'inline-source-map',
    entry:{
        index:path.resolve(__dirname,'./src/js/index.js'),
        detail:path.resolve(__dirname,'./src/js/detail.js'),
        collections:path.resolve(__dirname,'./src/js/collections.js')
    },
    output:{
        path:path.resolve(__dirname+'/dist'),
        filename:'js/[name].js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:/node_modules/,
                options:{
                    presets:[
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns:'usage',
                                corejs:{
                                    version:3
                                }
                            }
                        ]
                    ]
                }
            },
            {
                test:/\.tpl$/,
                use: [
                    {
                        loader:'ejs-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            },
            {
                test:/\.scss$/,
                use:[
                    {
                        loader: miniCssExtractPlugin.loader,
                        options: {
                            hmr:process.env.NODE_ENV === 'development'
                        }
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        /*options: {
                            plugins:function () {
                                return [autoprefixer('last 5 versions')]
                            }
                        }*/
                    }
                ]
            },
            {
                test:/\.(png|jpg|jpeg|gif|ico)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 指定图片限制的大小
                            limit: 1024,
                            // 指定打包后文件名称
                            name: '[name].[ext]',
                            // 指定打包后文件存放目录
                            outputPath: 'images/',
                            esModule: false
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ]

            }
        ]
    },
    plugins:[
        new uglify(),
        new htmlWebpackPlugin({
            template:path.resolve(__dirname,'./src/index.html'),
            minify:{
                removeComments:true,
                collapseWhitespace:true
            },
            filename:'index.html',
            title:'头条新闻',
            //当会引入多个js文件的时候，按照下面指定的顺序来引入
            chunksSortMode:'manual',
            chunks:['index'],
            excludeChunks:['node_modules'],
            hash:true
        }),
        new htmlWebpackPlugin({
            template:path.resolve(__dirname,'./src/detail.html'),
            minify:{
                removeComments:true,
                collapseWhitespace:true
            },
            filename:'detail.html',
            title:'新闻详情',
            //当会引入多个js文件的时候，按照下面指定的顺序来引入
            chunksSortMode:'manual',
            chunks:['detail'],
            excludeChunks:['node_modules'],
            hash:true
        }),
        new htmlWebpackPlugin({
            template:path.resolve(__dirname,'./src/collections.html'),
            minify:{
                removeComments:true,
                collapseWhitespace:true
            },
            filename:'collections.html',
            title:'我的收藏',
            //当会引入多个js文件的时候，按照下面指定的顺序来引入
            chunksSortMode:'manual',
            chunks:['collections'],
            excludeChunks:['node_modules'],
            hash:true
        }),
        new miniCssExtractPlugin({
            filename:'css/[name].css'
        })
    ],
    devServer:{
        contentBase: "./dist",
        open: true,
        watchOptions:{
            ignored:/node_modules/
        },
        host:'localhost',
        port:3300
    }
}
module.exports = config