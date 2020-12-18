const path = require("path"),
    HTMLWebpackPlugin = require("html-webpack-plugin"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { StatsWriterPlugin } = require("webpack-stats-plugin")

const sassOptions = {
    sourceMap: true,
};

module.exports = {
    entry: {
        app: [path.join(__dirname, "src/app.js"), path.join(__dirname, "src/app.scss")],
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: '/build/',
        filename: '[name].js',
        chunkFilename: '[name].[id].js',
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                sourceMap: true,
                                plugins: ["autoprefixer"]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: sassOptions,
                    }
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
    ],
};
