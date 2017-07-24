/**
 * Created by pinguo on 2017/7/24.
 * http://blog.csdn.net/hongchh/article/details/55113751
 */
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.xc');
const hotMiddleWare = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/',
    stats: {
        colors: true,
        chunks: false
    }
}));

app.use(hotMiddleWare(compiler, {
    log: false,
    path: "/__webpack_hmr",
    heartbeat: 2000
}));

app.listen(8080, () => {
    "use strict";
    console.log('dev-server on')
})