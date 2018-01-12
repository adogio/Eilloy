const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'app', 'main');
const APP_DIR = path.resolve(__dirname, 'src', 'main');

let config = {
    entry: APP_DIR + "/index.ts",
    target: "electron-main",
    output: {
        filename: "bundle.js",
        path: BUILD_DIR
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts"]
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: './tsconfig.json'
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        }),
        new UglifyJSPlugin()
    ]
};

module.exports = config;