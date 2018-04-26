const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'production',
    context: path.resolve(__dirname, '..'),
    entry: {
        vendor:[
            'react',
            'react-dom',
            'mobx',
            'mobx-react',
            'isomorphic-fetch'
        ],
        shared: [
            './client',
        ],
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
          chunks: "initial",         // 必须三选一： "initial" | "all"(默认就是all) | "async"
          minSize: 0,                // 最小尺寸，默认0
          minChunks: 1,              // 最小 chunk ，默认1
          maxAsyncRequests: 1,       // 最大异步请求数， 默认1
          maxInitialRequests: 1,    // 最大初始化请求书，默认1
          name: () => {},              // 名称，此选项课接收 function
          cacheGroups: {                 // 这里开始设置缓存的 chunks
            priority: "0",  
            vendor: {                   // key 为entry中定义的 入口名称
              chunks: "initial",        // 必须三选一： "initial" | "all" | "async"(默认就是异步)
              name: "vendor",           // 要缓存的 分隔出来的 chunk 名称
              minSize: 0,
              minChunks: 1,
              enforce: true,
              maxAsyncRequests: 1,       // 最大异步请求数， 默认1
              maxInitialRequests: 1,    // 最大初始化请求书，默认1
              reuseExistingChunk: true   // 可设置是否重用该chunk（查看源码没有发现默认值）
            }
          }
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    resolve: {extensions: ['.js', '.json']},
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../views/www/index.ejs',
            template: `!!raw-loader!${path.resolve(__dirname, '../views/index.tpl.ejs')}`
        }),
    ]
}