const devConfig = require('./dev')
const prodConfig = require('./prod')
const isProduct = ['production', 'prod'].includes(process.env.NODE_ENV)
const config = isProduct ? prodConfig : devConfig
const components = require('../components.json')
const externalP = Object.keys(components).map(item=>'@p'+item)
module.exports = {
  styleOutputPath: 'style',
  outputPath: 'lib',
  es : 'es',
  clearConsole: config.clearConsole,
  // 打包忽略
  external: ['vue','@p/button'],
  globals:{
    vue: 'Vue'
  }
}
