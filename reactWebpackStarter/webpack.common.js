const miniCssExtract = require("mini-css-extract-plugin")
const htmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const autoprefixer = require("autoprefixer")

const ASSET_PATH = process.env.ASSET_PATH || "/"

module.exports = {
	entry: ["babel-polyfill", "./src/index.js"],
	module: {
		//Specify all loaders inside rules array!!
		rules: [
			{
				use: "babel-loader",
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
			},
			// {
			//     //The following Command inserts CSS directly inside javaScript as some form of text
			//     use:["style-loader","css-loader"],
			//     test:/\.css$/,

			// },

			{
				test: /\.(jpe?g|png|gif|svg|webp)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "url-loader",
						options: { limit: 40000 },
					},
					//disable this to run on docker without errors
					//'image-webpack-loader',
				],
			},

			{
				test: /\.css$/,

				//we use extract-text-plugin to get hold of that css and insert it into some sort of a file!
				use: [
					{
						loader: "css-hot-loader",
					},
					{
						loader: miniCssExtract.loader,
						// options: {
						//   // only enable hot in development
						//   hmr: process.env.NODE_ENV === "development",
						//   // if hmr does not work, this is a forceful method.
						//   reloadAll: true
						// }
					},
					{
						loader: "css-loader",
					},
					{
						loader: "postcss-loader",
					},
				],
			},

			{
				test: /\.s[ac]ss$/i,

				//we use extract-text-plugin to get hold of that css and insert it into some sort of a file!
				use: [
					{
						loader: "css-hot-loader",
					},
					{
						loader: miniCssExtract.loader,
						// options: {
						//   // only enable hot in development
						//   hmr: process.env.NODE_ENV === "development",
						//   // if hmr does not work, this is a forceful method.
						//   reloadAll: true
						// }
					},
					{
						loader: "css-loader",
					},
					{
						loader: "postcss-loader",
					},
					{
						loader: "sass-loader",
					},
				],
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new miniCssExtract({
			// Options similar to the same options in webpackOptions.output
			// all options are optional
			filename: "[name].css",
			// chunkFilename: '[id].css',
			ignoreOrder: false, // Enable to remove warnings about conflicting order
		}),
		new htmlWebpackPlugin({
			template: "src/index.html",
		}),
		new webpack.DefinePlugin({
			"process.env.ASSET_PATH": JSON.stringify(ASSET_PATH),
		}),
		new webpack.SourceMapDevToolPlugin({}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [autoprefixer()],
			},
		}),
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				styles: {
					name: "styles",
					test: /\.css$/,
					chunks: "all",
					enforce: true,
				},

				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name(module) {
						// get the name. E.g. node_modules/packageName/not/this/part.js
						// or node_modules/packageName
						const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

						// npm package names are URL-safe, but some servers don't like @ symbols
						return `npm.${packageName.replace("@", "")}`
					},
					chunks: "all",
					maxInitialRequests: Infinity,
					minSize: 0,
				},
			},
		},
	},
}
