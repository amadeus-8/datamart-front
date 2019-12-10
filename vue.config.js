// vue.config.js
module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
        // pathRewrite: {
        //   '^/api': '/api'
        // }
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Vuetify-md-pro-clone/'
    : '/'
}
