const utils = require('../build/utils')
module.exports = {
  resolve: ['.tsx','.ts','.js', '.vue', '.json'],

  entries: [
    { find : '@' ,replacement : utils.resolve('../src')},
    { find : '@p',replacement : utils.resolve('../packages')},
    { find : '@e',replacement : utils.resolve('../examples')},
  ]
}
