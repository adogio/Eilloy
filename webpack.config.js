const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'app', 'renderer');
const APP_DIR = path.resolve(__dirname, 'src', 'renderer');
const PUBLIC_DIR = path.resolve(__dirname, 'public', 'template.html')

let config = {
    entry: APP_DIR + "/index.tsx",
    target: "electron-renderer",
    output: {
        filename: "bundle.js",
        path: BUILD_DIR
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".css", ".sass"]
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: './tsconfigRenderer.json'
                    }
                }]
            },
            {
                test: /\.sass$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Eilloy',
            template: PUBLIC_DIR
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        }),
        new UglifyJSPlugin()
    ]
};

module.exports = config;