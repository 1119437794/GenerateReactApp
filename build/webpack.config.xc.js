/**
 * Created by pinguo on 2017/7/24.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: [
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000',
            path.join(__dirname, '../', 'index.js')
        ]
    },

    output: {
        path: '/',

        filename: 'bundle.js',

        publicPath: '/'
    },

    devtool: '#source-map',

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },

            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },

            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            query: {
                                limit: 8192,
                                name: '/imgs/[hash].[ext]'
                            }
                        }
                }]
            },

            {
                test: /jsx?$/,
                exclude: /node_modules/,
                use: [
                    'react-hot-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react'],
                            plugins: [
                                'transform-decorators-legacy',
                                'transform-class-properties'
                            ]
                        }
                    }
                ]
            },
        ]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development") //development,production
            }
        }),

        new HtmlWebpackPlugin({
            title: '自定义后台',
            filename: 'index.html',
            template: path.join(__dirname, '../', 'index.html'),
            inject: true
        }),
    ],

    resolve: {
        extensions: ['.js', '.jsx','.css','.less','.scss']
    }
}
