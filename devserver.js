'use strict';
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const open = require('open');
let config = require('./webpack.config.js');
const port = config.devServer.port;

for (let key in config.entry) {
    let entryItem = config.entry[key];
    if (key != "common") {
        entryItem.unshift("webpack-dev-server/client?http://"+'localhost'+":"+port+"/", "webpack/hot/dev-server");
    }
}

config.plugins = config.plugins || [];
config.plugins.push(new webpack.HotModuleReplacementPlugin());

new WebpackDevServer(webpack(config), config.devServer)
    .listen(port, '0.0.0.0', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Listening at localhost:' + port);
        console.log('Opening your system browser...');
        open('http://'+('localhost')+':' + port + '/');
    });
