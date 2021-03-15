const fs = require('fs')
const { formatTypeList, addons, esDir } = require('../config/rollup.build.config.js')
const components = require('../components.json')
const { styleOutputPath } = require('../config/index')
const { build } = require('./rollup.createConfig')
const { resolve, getAssetsPath } = require('./utils')
fs.mkdirSync(resolve())
fs.mkdirSync(getAssetsPath(styleOutputPath))
if ([...formatTypeList, ...addons].some((item) => item.format === esDir)) {
  fs.mkdirSync(getAssetsPath(esDir))
}
let pkg = []
formatTypeList.forEach(({ format, min, suffix } = {}) => {
  for(const [output, input] of Object.entries( components)){
    pkg.push({ min, format, suffix, moduleName: output, input, output })

  }

})
pkg = pkg.concat(addons)

build(pkg)

