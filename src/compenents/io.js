const fs = require('fs')
const util = require('util')

const WRITE = util.promisify(fs.writeFile)
const READ = util.promisify(fs.readFile)

module.exports = WRITE
module.exports = READ