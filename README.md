<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h3 align="center">Vue typeORM Application</h3>
<p align="center"><strong><code>vue-typeorm-app</code></strong></p>
<br>
<p align="center">Vue application demonstrating the use of TypeORM</p>
<p align="center"><strong><code>with @capacitor-community/sqlite</code></strong></p>
<br>
<p align="center"><strong><code>this app uses Capacitor3</code></strong></p>
<br>
<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2022?style=flat-square" />
  <a href="https://github.com/jepiqueau/vue-typeorm-app"><img src="https://img.shields.io/github/license/jepiqueau/vue-typeorm-app?style=flat-square" /></a>
  <a href="https://github.com/jepiqueau/vue-typeorm-app"><img src="https://img.shields.io/github/package-json/v/jepiqueau/vue-typeorm-app/master?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-"><img src="https://img.shields.io/badge/all%20contributors-2-orange?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>

## Maintainers

| Maintainer        | GitHub                                    | Social |
| ----------------- | ----------------------------------------- | ------ |
| Quéau Jean Pierre | [jepiqueau](https://github.com/jepiqueau) |        |


this is an application to test Ionic/Vue with the TypeORM driver for `@capacitor-community-sqlite` 

In this application with use `typeOrm migrations` to build the database instead of using a the `synchronize: true` option when creating the connection.

To have `typeOrm migrations` working you must add in or create a `vue.config.js` the following

```js
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

```

## Installation

```bash
git clone https://github.com/jepiqueau/vue-typeorm-app
npm run build
npx cap sync
npx cap copy
npx cap open ios
npx cap open android
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<p align="center">
  <a href="https://github.com/jepiqueau"><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="50" height="50" /></a>
  <a href="https://github.com/DawidWetzler"><img src="https://avatars.githubusercontent.com/u/49675685?v=4" width="50" height="50" /></a>
</p>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

