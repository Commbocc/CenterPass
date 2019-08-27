module.exports = {
  publicPath: './',
  productionSourceMap: false,
  css: {
    extract: false
  },
  devServer: {
    proxy: {
      '/iwtweb': {
        // target: 'http://q-flow-tt/',
        target: 'https://centerpass.hillsboroughcounty.org/',
        // ws: true,
        changeOrigin: true
      }
    }
  }
}
