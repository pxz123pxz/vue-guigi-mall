// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
// })
module.exports = {
  productionSourceMap:false,
  lintOnSave: false, //关闭语法检查，
  //代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
      },

    }
  },
  publicPath: './'
    
}
