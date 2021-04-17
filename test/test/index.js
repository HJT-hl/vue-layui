const str = `var Button = require('@p/button');`
const b = str.replace(/var\s([^\s]*)\s=\srequire\('@p\/([^']*)'\);/g,`var $1 = require('./$2');`)

console.log(b)
