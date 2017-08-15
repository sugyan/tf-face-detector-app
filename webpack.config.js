const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(path.join(__dirname, 'static', 'js')),
        filename: 'bundle.js'
    },
};
