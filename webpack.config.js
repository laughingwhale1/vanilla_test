const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PORT = 3000;

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    mode: "development",
    resolve: {
        extensions: ['.ts', '.js'],
        preferAbsolute: true,
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        mainFiles: ['index'],
        alias: {},
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        }),
    ],
    devServer: {
        port: PORT,
        open: true,
        historyApiFallback: true,
        hot: true,
    },
};