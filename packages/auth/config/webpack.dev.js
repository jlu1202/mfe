const { merge } = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const port = process.env.MARKETING_PORT || 8082;

const devConfig = {
    mode: 'development',
    output: {
        publicPath: `http://localhost:${port}/`,
    },
    devServer: {
        port: `${port}`,
        historyApiFallback: {
            index: '/index.html',
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes: {
                './AuthApp': './src/bootstrap',
            },
            shared: packageJson.dependencies,
            // shared: ['react', 'react-dom'],
        }),
        new HTMLWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};

module.exports = merge(commonConfig, devConfig);