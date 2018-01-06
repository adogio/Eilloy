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
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: './tsconfigRenderer.json'
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
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
        contentBase: path.resolve(__dirname, 'dist', 'renderer'),
        publicPath: '/',
        port: 8080,
        inline: true,
        historyApiFallback: true
    }
};

module.exports = config;