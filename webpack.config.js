"use strict";
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var STATIC_SRC = require("./f2eci")["static-src"];
var DIST_PATH = require('./f2eci').dist;
var HTML_PATH = require('./f2eci').output;
const env = require("./f2eci").env;
const PUBLIC_PATH = require('./f2eci').urlPrefix + STATIC_SRC + '/';
var plugins = [
    new CleanWebpackPlugin(['dist'], {
        root: path.join(__dirname),
        verbose: true,
        dry: false
    }),
    new CopyWebpackPlugin([
        {
            from: './html',
            to: '../'
        }
    ]),
    new ExtractTextPlugin("[name].css", {allChunks: true})
];
if (env == "product") {
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }));
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
}
module.exports = {
    entry: {
        'index': ['./src/index.js'],
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, DIST_PATH, STATIC_SRC),
        publicPath: PUBLIC_PATH,
        chunkFilename: '[name].[chunkhash].js',
        sourceMapFilename: '[name].map'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.es6', '.json', '.jsx', '.vue', '']
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue',
                exclude: /node_modules\/(?!@(gfe|dp))/
            }, {
                test: /\.(es6|js)$/,
                loader: 'babel',
                exclude: /node_modules\/(?!@(gfe|dp))/
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader?-restructuring!postcss')
            }, {
                test: /\.css\.module/,
                loader: ExtractTextPlugin.extract('css-loader?-restructuring&modules&localIdentName=[local]___[hash:base64:5]!postcss')
            }, {
                test: /\.woff|ttf|woff2|eot$/,
                loader: 'url?limit=100000'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css-loader!postcss!less')
            }, {
                test: /\.less\.module/,
                loader: ExtractTextPlugin.extract('css-loader?modules&localIdentName=[local]___[hash:base64:5]!postcss!less')
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['url?limit=25000']
            }
        ]
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract("css"),
            // you can also include <style lang="less"> or other langauges
            less: ExtractTextPlugin.extract("css!less")
        }
    },
    postcss: function() {
        return [
            require('postcss-initial')({reset: 'all'}),
            require('autoprefixer')({browsers: ['> 5%']})
        ];
    },
    plugins: plugins,
    devServer: {
        contentBase: HTML_PATH,
        historyApiFallback: false,
        hot: true,
        port: 8080,
        publicPath: PUBLIC_PATH,
        noInfo: false
    }
};
