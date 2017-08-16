const path = require('path');

module.exports = {
    entry: './src/main.tsx',
    output: {
        path: path.resolve(path.join(__dirname, 'static', 'js')),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.tsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                    }
                }
            }
        ]
    }
};
