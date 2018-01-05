const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'dist', 'renderer');
const APP_DIR = path.resolve(__dirname, 'src', 'renderer');
const PUBLIC_DIR = path.resolve(__dirname, 'public', 'template.html')

let config = {
    entry: APP_DIR + "/index.tsx",
    target: "electron-renderer",
    output: {
        filename: "bundle.js",
        path: BUILD_DIR
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Eilloy',
            template: PUBLIC_DIR
        }),
        new UglifyJSPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
};

module.exports = config;