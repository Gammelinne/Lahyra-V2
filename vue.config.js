const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
 /* devServer: {
    host: "drinkolo.test",
    proxy: 'http://drinkolo-back.test',
    // https: true,
  },*/
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
