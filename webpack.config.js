module.exports = {
	context: __dirname + '/src/',
	entry: './index.ts',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/dist/'
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				loader: 'awesome-typescript-loader',
				exclude: /node_modules/,
			},
		]
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
};