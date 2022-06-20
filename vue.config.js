const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  devServer: {
    proxy: {
      [process.env.VUE_APP_API_BASE_URL]: {
        target: process.env.VUE_APP_DEV_API_ENDPOINT,
        pathRewrite: {
          [`^${process.env.VUE_APP_API_BASE_URL}`]: '',
        },
      },
    },
  },
})
