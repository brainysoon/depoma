const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                loader: "babel-loader"
            }
        ]
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src/')
        },
        extensions: [".js", ".json", ".jsx", ".css"],
    },
};