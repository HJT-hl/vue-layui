const utils = require('../build/utils')
module.exports = {
  resolve: ['.tsx','.ts','.js', '.vue', '.json'],
  entries: {
    '@': utils.resolve('../src'),
    '@p': utils.resolve('../packages'),
    '@e': utils.resolve('../examples'),
    '@u' : utils.resolve('../packages/utils')
  }
}
