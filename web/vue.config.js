module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'content': '@/components/content',
        'common': '@/components/common',
        'assets': '@/assets',
        'api': '@/api',
        'views': '@/views',
      },
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/scss/variables.scss";`
      }
    }
  },
}