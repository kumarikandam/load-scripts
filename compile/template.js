const { _loadScripts, _loadJSON, _loadStyle } = require('./depack')

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

/**
 * @methodType {_lemuria.loadStyle}
 */
function loadStyle(url, onload) {
  return _loadStyle(url, onload)
}

module.exports = loadScripts
module.exports.loadJSON = loadJSON
module.exports.loadStyle = loadStyle
