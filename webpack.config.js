module.exports = {
	context: __dirname + '/src/',
	entry: {
		schedule: './index.ts',
		example: './example/index.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: __dirname + '/dist/',
		library: ['Schedule'],
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				loader: 'awesome-typescript-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.js$/,
				use: [{
					loader: 'babel-loader',
					options: { presets: ['es2015', 'stage-0'] }
				}]
			}
		]
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
};