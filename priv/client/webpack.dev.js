const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: ['babel-polyfill', './src/index.js']
    },
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: "/",
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './dist/index.html'
        })
    ],
    devServer: {
        disableHostCheck: true,
        historyApiFallback: true
    }
};
