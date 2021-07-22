module.exports = {
	chainWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			config.optimization.minimizer('terser').tap((args) => {
				// see https://cli.vuejs.org/guide/webpack.html#chaining-advanced
				// https://cli.vuejs.org/migrating-from-v3/#vue-cli-service
				//   => chainWebpack for a chain override example
				// https://github.com/terser/terser#minify-options for terser options
				const terserOptions = args[0].terserOptions
				// Avoid to mangle entities (leads to query errors)
				terserOptions["keep_classnames"] = true
				terserOptions["keep_fnames"] = true
				// console.log(JSON.stringify(args[0], null, 2))
				return args
			})
		}
	},
}
