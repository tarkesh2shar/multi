const merge = require("webpack-merge")
const common = require("./webpack.common")
const path = require("path")

module.exports = merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[hash].js",
		publicPath: "/",
	},
	devServer: {
		contentBase: "./dist",
		hot: true,
		historyApiFallback: true,
		publicPath: "/",
		disableHostCheck: true,
	},
})
