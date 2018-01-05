const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const BUILD_DIR = path.resolve(__dirname, 'dist', 'renderer');
const APP_DIR = path.resolve(__dirname, 'src', 'renderer');
const PUBLIC_DIR = path.resolve(__dirname, 'public', 'template.html')

let config = {
    devtool: 'cheap-module-eval-source-map',
    target: "electron-renderer",
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client',
        'webpack/hot/only-dev-server',
        APP_DIR + "/index.tsx"
    ],
    output: {
        filename: "bundle.js",
        path: BUILD_DIR,
        publicPath: '/'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".css"]
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: [
                    'awesome-typescript-loader'
                ],
                include: path.resolve(__dirname, 'src', 'renderer')
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                include: path.resolve(__dirname, 'src', 'renderer')
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
                include: path.resolve(__dirname, 'src', 'renderer')
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Eilloy',
            template: PUBLIC_DIR
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    devServer: {
        hot: true,
        host: 'localhost',
        contentBase: path.resolve(__dirname, 'dist', 'renderer'),
        publicPath: '/',
        port: 8080,
        inline: true,
        historyApiFallback: false
    }
};

module.exports = config;