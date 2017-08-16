const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');

const config = {
    entry: './src/main.tsx',
    output: {
        path: path.resolve(path.join(__dirname, 'static', 'js')),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
};
if (process.env.NODE_ENV === 'production') {
    config.output.filename = 'main.[hash].js'
    config.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new ManifestPlugin({

        })
    ];
}

module.exports = config;
