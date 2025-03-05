const { merge } = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const port = process.env.MARKETING_PORT || 8081;

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: '/index.html',
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap',
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