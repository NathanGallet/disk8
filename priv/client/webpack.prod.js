const path = require('path');

module.exports = {
    entry: {
        app: ['babel-polyfill', './src/index.js']
    },
    output: {
        path: path.join(__dirname, '/../static/js'),
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
    }
};
