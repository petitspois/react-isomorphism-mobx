const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin'),
    ProgressBarPlugin = require('progress-bar-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    devtool: 'eval-source-map',
    mode:'development',
    context: path.resolve(__dirname, '..'),
    entry: {
        shared: [
            'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
            './client',
        ],
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options:{
                cacheDirectory: true,
                plugins: ['react-hot-loader/babel'],  
            }
        }]
    },
    resolve: {extensions: ['.js', '.json']},
    plugins: [
        new CleanWebpackPlugin(['../dist']),
        new HtmlWebpackPlugin({
            filename: '../views/www/index.ejs',
            template: `!!raw-loader!${path.resolve(__dirname, '../views/index.tpl.ejs')}`,
            alwaysWriteToDisk: true,
        }),
        new HtmlWebpackHarddiskPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
}