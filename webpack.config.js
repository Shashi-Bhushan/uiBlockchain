/**
 * Created by shashi on 6/8/17.
 */

'use strict';

const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const version = require('./package.json').version;

const entrypoints = {};
// Plugins are what gives UI it's functionality
const plugins = glob.sync('./plugins/*/js/index.js');
console.log("working");
console.log(plugins);
plugins.forEach((plugin) => {
    entrypoints[path.dirname(path.dirname(plugin))] = [plugin]
});

const common = {
    output : {
        path : path.resolve('./dist'),
        filename : '[name].js',
        publicPath : 'dist/'
    },
    resolve : {
        modules : [path.resolve('./node_modules')]
    },
    node : {
        global : true,
        __dirname : false,
        __filename : false
    }
}

const renderer = Object.assign({}, {
    entry : entrypoints,
    plugins : [
        new webpack.DefinePlugin({
            VERSION : JSON.stringify(version)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        })
    ],
    target: 'electron-renderer'
}, common);

module.exports = [renderer]