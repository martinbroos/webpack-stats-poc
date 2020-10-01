const path = require("path"),
    HTMLWebpackPlugin = require("html-webpack-plugin"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { StatsWriterPlugin } = require("webpack-stats-plugin")

const sassOptions = {
    includePaths: [path.resolve(__dirname, "node_modules")]
};

module.exports = {
    entry: {
        app: [path.join(__dirname, "src/app.js"), path.join(__dirname, "src/app.scss")],
    },
    output: {
        path: path.resolve(__dirname, "build"),
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: sassOptions
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.jpe?g$|\.png$|\.gif$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[contenthash].[ext]',
                },
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "src/index.html")
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new StatsWriterPlugin({
            fields: ['hash', 'assetsByChunkName', 'assets'],
        })
    ]
};
