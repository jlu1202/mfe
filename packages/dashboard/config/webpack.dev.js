const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const port = process.env.MARKETING_PORT || 8083;

const devConfig = {
    mode: 'development',
    output: {
        publicPath: `http://localhost:${port}/`,
    },
    devServer: {
        port: `${port}`,
        historyApiFallback: {
      historyApiFallback: true,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'dashboard',
            filename: 'remoteEntry.js',
            exposes: {
                './DashboardApp': './src/bootstrap',
            },
            shared: packageJson.dependencies,
            // shared: ['react', 'react-dom'],
        }),
    	new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};

module.exports = merge(commonConfig, devConfig);