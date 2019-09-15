const { _loadScripts, _loadJSON } = require('./depack')

/**
 * @methodType {_lemuria.loadScripts}
 */
function loadScripts(scripts, callback) {
  return _loadScripts(scripts, callback)
}

/**
 * @methodType {_lemuria.loadJSON}
 */
function loadJSON(url, onload) {
  return _loadJSON(url, onload)
}

module.exports = loadScripts
module.exports.loadJSON = loadJSON
