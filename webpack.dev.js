const { merge } = require("webpack-merge")
const common = require("./webpack.common")

module.exports = () => {
    const config = {
        mode: "development",
        devtool: "inline-source-map",
        target: "web",
        devServer: {
            port: 3000,
            hot: true,
            compress: true,
            historyApiFallback: true,
            open: {
                app: {
                    name: "chrome",
                },
            },
            client: {
                overlay: {
                    warnings: true,
                    errors: true,
                },
            },
            proxy: {
                "/api": {
                    target: "https://reqres.in",
                    secure: false,
                    changeOrigin: true,
                },
            },
        },
    }
    return merge(common, config)
}
