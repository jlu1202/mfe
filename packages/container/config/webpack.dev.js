const { merge } = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const port = process.env.MARKETING_PORT || 8080;

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
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
                auth: 'auth@http://localhost:8082/remoteEntry.js',
                dashboard: 'dashboard@http://localhost:8083/remoteEntry.js',
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