const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

module.exports = {
    entry: path.resolve(__dirname, "src/index.js"),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, "src"),
                exclude: /(node_modules|dist)/,
                use: ["babel-loader", "source-map-loader"],
                enforce: "pre",
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                type: "asset/resource",
                generator: {
                    filename: "images/[hash][ext][query]",
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[hash][ext][query]",
                },
            },
            {
                test: /\.json$/,
                loader: "json-loader",
            },
        ],
    },
    resolve: {
        modules: [path.join(__dirname, "src"), "node_modules"],
        extensions: [".js", ".jsx", ".css", ".json"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
            filename: "index.html",
            favicon: "./public/logo.ico",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[chunkhash].css",
            linkType: "text/css",
        }),
    ],
    performance: {
        maxEntrypointSize: 500000,
        maxAssetSize: 500000,
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith(".js")
        },
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin({
                parallel: true,
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: {
                                removeAll: true,
                            },
                        },
                    ],
                },
            }),
        ],
        splitChunks: {
            chunks: "all",
            hidePathInfo: true,
            minSize: 21000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
}
