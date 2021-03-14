const rollup = require('rollup')
const { nodeResolve  }  = require('@rollup/plugin-node-resolve')
const {babel} = require('@rollup/plugin-babel')
const image = require('rollup-plugin-img')
const vue = require('rollup-plugin-vue')
const commonjs = require('rollup-plugin-commonjs')
const { terser } = require('rollup-plugin-terser')
const replace = require('@rollup/plugin-replace')
const json = require('rollup-plugin-json')
const postcss = require('rollup-plugin-postcss')
const filesize = require('rollup-plugin-filesize')
const { cssUrl, importLoader } = require('@sixian/css-url')
const fs = require('fs')
const { getAssetsPath, env, fsExistsSync, chalkConsole } = require('./utils')
const { esDir } = require('../config/rollup.build.config')
const { styleOutputPath, external,es,globals } = require('../config/index')
const banner = require('../config/banner')
const alias = require('@rollup/plugin-alias')
const aliasConfig = require('../config/alias')
const typescript  = require('rollup-plugin-typescript2')
const isEs = (fmt) => fmt === esDir

function createPlugins({ min } = {}) {
  const exclude = 'node_modules/**'
  const plugins = [
    typescript(),
    commonjs(),
    vue({
      css: false
    }),
    json(),
    filesize(),
    nodeResolve({
      extensions: aliasConfig.resolve
    }),
    babel({
      babelHelpers : 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.ts','.tsx','.js', '.jsx'  ],
    }),
    image({
      hash: false,
      output: getAssetsPath('/imgs'), // default the root
      extensions: /\.(png|jpg|jpeg|gif|svg)$/,
      limit: 8192, // default 8192(8k)
      exclude
    }),
    postcss({
      plugins: [cssUrl({
        imgOutput: getAssetsPath('/imgs'),
        fontOutput: getAssetsPath('/fonts'),
        cssOutput: getAssetsPath(styleOutputPath)
      })],
      use: [ ['less',{ javascriptEnabled: true } ] , 'import-url'],
      inject: false,
      extract : true,
      loaders: [importLoader]
    }),
    replace({
      exclude,
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    alias({
      entries: aliasConfig.entries
    }),

  ]
  if (min) {
    plugins.push(terser())
  }
  return plugins
}

/**
 * 打包
 * @param {*} config
 */
function build(builds) {
  let buildCount = 0

  const total = builds.length
  console.log('=============builds===============');
  console.log(builds);
  const next = async () => {
    chalkConsole.building(buildCount + 1, total)
    await buildEntry(builds[buildCount])
    buildCount++
    buildCount < total ? next() : chalkConsole.success()
  }
  next()
}
/**
 * 打包入口
 * @param {*} config
 */
async function buildEntry(config) {
  const { output, suffix, input, format, moduleName } = config

  const inputOptions = {
    input,
    external,
    plugins: createPlugins(config)
  }
  const fullName = output + suffix
  const file = getAssetsPath(fullName)
  const outOptions = {
    // dir: getAssetsPath(),
    file,
    format,
    name: moduleName,
    // exports: 'named',
    globals,
    exports: 'auto'
    // entryFileNames: file
  }

  const bundle = await rollup.rollup(inputOptions)
  let { output: outputData } = await bundle.generate(outOptions)
  await write({ output: outputData, fileName: output, format, fullName, file })
}
/**
 * 输入js文件
 * @param {*} param0
 */
async function write({ output, file, fileName, format, fullName } = {}) {
  for (const { type, code, source } of output) {

    if (type === 'asset') {
      const cssFileName = `${fileName}.css`
      const filePath = isEs(format)
        ? getAssetsPath(`/${es}/${cssFileName}`)
        : getAssetsPath(`/${styleOutputPath}/${cssFileName}`)

      !fsExistsSync(filePath) && fs.writeFileSync(filePath, banner + source.toString())
    } else {
      const filePath = isEs(format) ? getAssetsPath(`/${es}/${fullName}`) : file
      let codeSource = code.replace(/\s?const\s/g, ' var ')
      fs.writeFileSync(filePath, banner + codeSource)
    }
  }
}
module.exports = {
  build
}
