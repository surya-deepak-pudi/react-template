const path = require("path")
const { merge } = require("webpack-merge")
const common = require("./webpack.common")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = (enc, argv) => {
    const config = {
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js",
            chunkFilename: "[chunkhash].js",
            clean: true,
        },
    }
    common.plugins.push(
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "public/manifest.json",
                    to: "",
                },
                {
                    from: "public/logo.ico",
                    to: "",
                },
            ],
            options: {
                concurrency: 100,
            },
        })
    )
    common.optimization.minimizer.push(
        new TerserPlugin({ extractComments: false })
    )
    if (argv === "development") {
        config.mode = argv
        config.devtool = "source-map"
    } else {
        config.mode = "production"
    }
    return merge(common, config)
}
